using Alchemy4Tridion.Plugins.GUI.Configuration;
using Alchemy4Tridion.Plugins.GUI.Configuration.Elements;

namespace $rootnamespace$.Config
{
    /// <summary>
    /// Represents the ResourceGroup element within the editor configuration that contains this plugin's files
    /// and references.
    /// </summary>
    public class HelloResourceGroup : ResourceGroup
    {
        /// <summary>
        /// Constructor
        /// </summary>
        public HelloResourceGroup()
        {
            // When adding files you only need to specify the filename and not full path
            AddFile("ErrorTestCommand.js");
            AddFile("GetApiVersionCommand.js");
            AddFile("HelloWorldCommand.js");
            AddFile("HelloSettingsCommand.js");

            AddFile("Hello.css");

            // When referencing commandsets you can just use the generic AddFile with your CommandSet as the type.
            AddFile<HelloCommandSet>();

            // The above is just a convinient way of doing the following...
            // AddFile(FileTypes.Reference, "Alchemy.Plugins.HelloWorld.Commands.HelloCommandSet");
            
            // If you want this resource group to contain the js proxies to call your webservice, call AddWebApiProxy()
            AddWebApiProxy();
            
            // If you're not using any of the Dependencies.AddLibrary... or AddWebApiProxy(), you'll want to ensure
            // your resource group has access to the core alchemy library by using:

            //     Dependencies.AddAlchemyCore();

            // All other library or proxy dependencies already have the alchemy core as a dependency.
        }
    }
}
