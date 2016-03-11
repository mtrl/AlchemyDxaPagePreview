/**
 * Creates an anguilla command using a wrapper shorthand.
 *
 * This command is an example of interacting with the custom configuration settings of your plugin.
 *
 * Note the ${PluginName} will get replaced by the actual plugin name. It was used here as this file is included
 * in the HelloWorld nuget package so will be replaced by your plugin's name.  In your plugin, you can just use
 * your actual plugin's name.
 */
Alchemy.command("${PluginName}", "HelloSettings", {

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
    isAvailable: function () {
        return true;
    },

    /**
     * Executes your command. You can use _execute or execute as the property name.
     */
    execute: function () {

        var progress = $messages.registerProgress("Getting client settings..", null);

        // This is the error first callback pattern that the webapi proxy js exposes. Look at another example to
        // see how the promise pattern can also be used.

        // The call back must go as last parameter of action method.
        Alchemy.Plugins["${PluginName}"].Api.getSettings()
            .success(function (settings) {
                $messages.registerGoal("Settings are: " + JSON.stringify(settings));
                console.log(settings);
            })
            .error(function () {
                $messages.registerError("There was an error", error.message);
            })
            .complete(function () {
                progress.finish();
            });
    }
});