using Alchemy4Tridion.Plugins.GUI.Configuration;

namespace $rootnamespace$.Config
{
    /// <summary>
    /// Represents an extension element in the editor configuration for creating a context menu extension.
    /// </summary>
    public class HelloContextMenu : ContextMenuExtension
    {
        /// <summary>
        /// Constructor
        /// </summary>
        public HelloContextMenu()
        {
            // This is the id which gets put on the html element for this menu (to target with css/js).
            AssignId = "HelloContextMenu"; 
            // The name of the extension menu
            Name = "HelloContextMenu";
            // Where to add the new menu in the current context menu.
            InsertBefore = "cm_refresh";

            // Generate all of the context menu items...
            AddSubMenu("cm_helloworld", "Hello World") // creates a submenu item and returns it so you can chain items to it
                .AddItem("cm_helloworld_error", "Error Test", "ErrorTest")         // adds following items to above submenu
                .AddItem("cm_helloworld_api", "Get Api Version", "GetApiVersion")
                .AddItem("cm_helloworld_hi", "Hi!", "HelloWorld")
                .AddItem("cm_helloworld_settings", "Settings", "HelloSettings");

            // We need to addd our resource group as a dependency to this extension
            Dependencies.Add<HelloResourceGroup>();

            // Actually apply our extension to a particular view.  You can have multiple.
            Apply.ToView(Constants.Views.DashboardView);
        }
    }
}
