/**
 * Creates an anguilla command using a wrapper shorthand. The command will communicate with the web service
 * to return a message.
 *
 * Note the ${PluginName} will get replaced by the actual plugin name.
 */
Alchemy.command("${PluginName}", "DxaPreview", {
    /**
     * Whether or not the command is enabled for the user (will usually have extensions displayed but disabled).
     * @returns {boolean}
     */
    isEnabled: function () {
        return true;
    },

    /**
     * Whether or not the command is available to the user.
     * @returns {boolean}
     */
    isAvailable: function (selection, pipeline) {
        // Only make preview available on pages
        if (selection.getItems().length == 1) {
            var item = $models.getItem(selection.getItem(0));
            if (item.getItemType() == $const.ItemType.PAGE) {
                return true;
            }
        }
        
        

        return false;
    },

    /**
     * Executes your command. You can use _execute or execute as the property name.
     */
    execute: function (selection, pipeline) {

        var settings;
        loadSettings();
        $messages.registerGoal("Launching DXA page preview");

        function loadSettings() {
            Alchemy.Plugins["${PluginName}"].Api.getSettings()
                .success(function (settingsData) {
                    settings = settingsData;
            })
            .error(function () {
                $messages.registerError("There was an error", error.message);
            })
            .complete(function () {
                loadPage();
            });
        }

        function loadPage() {
            var itemId = selection.getItem(0);

            var thePage = $tcm.getItem(itemId);
            if (thePage.isLoaded()) {
                loadPageTemplate(thePage);
            } else {
                $evt.addEventHandler(thePage, "load", function (event) {
                    loadPageTemplate(thePage);
                    // event.source also contains the page instance.
                });
                thePage.load();
            }
        }

        //dxaPreviewSiteUrl, pageUrl, pageId, pageTemplateId
        function loadPageTemplate(thePage) {
            var pageTemplate = $tcm.getItem(thePage.getPageTemplateId());
            if (pageTemplate.isLoaded()) {
                openPreviewWindow(thePage, pageTemplate);
            } else {
                $evt.addEventHandler(pageTemplate, "load", function (event) {
                    //console.log(pageTemplate.getFileExtension());
                    openPreviewWindow(thePage, pageTemplate);
                });
                pageTemplate.load();
            }
        }

        function openPreviewWindow(page, pageTemplate) {
            if (settings.DxaPreviewApplicationUrl == "" || settings.DxaPreviewApplicationUrl == null) {
                alert("The DXA Page Preview plugin is not configured. You need to specify a value for the DxaPreviewApplicationUrl setting in the plugin's a4t.xml file");
            }
            var publishPath = page.getPublishPath().replace(/\\/g, "/");
            var templateId = page.getPageTemplateId();
            var fileName = page.getFileName();
            var fileExtension = pageTemplate.getFileExtension();
            var pageUrl = publishPath + fileName + '.' + fileExtension
            var previewUrl = settings.DxaPreviewApplicationUrl + pageUrl + '?preview=true&pageUri=' + page.getId() + '&templateUri=' + templateId + '&pageUrl=' + pageUrl;
            var popup = $popup.create(previewUrl, "menubar=no,location=no,resizable=no,scrollbars=no,status=no,width=1024,height=650", null);
            popup.open();
        }
    }
});