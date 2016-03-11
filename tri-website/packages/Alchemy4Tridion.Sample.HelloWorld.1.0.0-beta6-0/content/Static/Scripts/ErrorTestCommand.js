Type.registerNamespace("Alchemy.Plugins.${PluginName}.Commands");

/**
 * Example of using a plain old anguilla creation of a command. Note that using this style will not be covered
 * by the Alchemy api if there's any changes to Anguilla in future.
 */
Alchemy.Plugins["${PluginName}"].Commands.ErrorTest = function () {
    Type.enableInterface(this, "Alchemy.Plugins.${PluginName}.Commands.ErrorTest");
    this.addInterface("Tridion.Cme.Command", ["ErrorTest"]);
};

// ErrorTest Prototype
Alchemy.Plugins["${PluginName}"].Commands.ErrorTest.prototype = {

    /**
     * Whether or not the command is available. Just an example of how to check for admins only.
     */
    isAvailable: function (selection) {
        return Tridion.Runtime.IsAdministrator === "1";
    },

    /**
     * Whether or not the command is enabled. Just an example of how to check for admins only.
     */
    isEnabled: function (selection) {
        return Tridion.Runtime.IsAdministrator === "1";
    },

    /**
     * Executes the command.
     */
    _execute: function (selection) {

        var progress = $messages.registerProgress("Waiting for an error...", null),
            Service = Alchemy.Plugins["${PluginName}"].Api.HelloService,
            userName = Tridion.ContentManager.UserSettings.getInstance().getUserName();

        // another way of setting the success message
        progress.setOnSuccessMessage("Plugin Installed Successfully!");

        // Promise pattern. See HelloWorldCommand for callback style.

        // We are doing an http post here... the post data goes as the last argument. Route params goes
        // before the post data.
        Service.errorTest("someRouteParamValue", { name: userName, age: 5 })
			.success(function (data) {
                // we'll never hit this since errorTest should throw exception
			    progress.finish({ success: true }); // success: true will finish and display the success message
			})
			.error(function (errorType, error) {
			    progress.finish(); // don't pass success: true so we don't display success message
			    $messages.registerError("There as an error as expected!", errorType + " " + error.message);
			});
    }
}