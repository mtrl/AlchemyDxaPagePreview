/**
 * Creates an anguilla command using a wrapper shorthand. The command will communicate with the web service
 * to return a message.
 *
 * Note the ${PluginName} will get replaced by the actual plugin name.
 */
Alchemy.command("${PluginName}", "HelloWorld", {
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

        var progress = $messages.registerProgress("Getting api version...", null),
            userName = "AlchemyTester";

        // This is the error first callback pattern that the webapi proxy js exposes. Look at another example to
        // see how the promise pattern can also be used.

        // The call back must go as last parameter of action method.
        Alchemy.Plugins["${PluginName}"].Api.HelloService.helloWorld(userName, function (error, message) {
            progress.finish({ success: true });
            if (error) {
                // error will only exist if there was an error, otherwise it'll be null.
                $messages.registerError("There was an error", error.message);
            }
            $messages.registerGoal(message, null);
        });
    }
});