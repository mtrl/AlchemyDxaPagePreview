/**
 * Creates an anguilla command using a wrapper shorthand. Command is responsible for communicating wtih api controller
 * to get the core service api version.
 *
 * Note the ${PluginName} will get replaced by the actual plugin name.
 */
Alchemy.command("${PluginName}", "GetApiVersion", {

    /**
     * If an init function is created, this will be called from the command's constructor when a command instance
     * is created.
     */
    init: function () {
        console.log("INIT CALLED FROM GetApiVersion");
    },
    
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

        var progress = $messages.registerProgress("Getting api version...", null);

        // This is the Promise pattern that the webapi proxy js exposes. Look at another example to
        // see how the callback method can also be used.
        Alchemy.Plugins["${PluginName}"].Api.HelloService.getApiVersion()
            .success(function (apiVersion) {
                // first arg in success is what's returned by your controller's action
                $messages.registerGoal("Api Version is " + apiVersion);
            })
            .error(function (type, error) {
                // first arg is string that shows the type of error ie (500 Internal), 2nd arg is object representing
                // the error.  For BadRequests and Exceptions, the error message will be in the error.message property.
                $messages.registerError("There was an error", error.message);
            })
            .complete(function () {
                // this is called regardless of success or failure.
                progress.finish();
            });
    }
});