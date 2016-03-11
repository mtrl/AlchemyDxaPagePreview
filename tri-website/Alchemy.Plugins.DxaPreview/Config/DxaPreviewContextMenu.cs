using Alchemy4Tridion.Plugins.GUI.Configuration;

namespace Alchemy.Plugins.DxaPreview.Config
{
    /// <summary>
    /// Represents an extension element in the editor configuration for creating a context menu extension.
    /// </summary>
    public class DxaPreviewContextMenu : ContextMenuExtension
    {
        /// <summary>
        /// Constructor
        /// </summary>
        public DxaPreviewContextMenu()
        {
            // This is the id which gets put on the html element for this menu (to target with css/js).
            AssignId = "HelloContextMenu"; 
            // The name of the extension menu
            Name = "HelloContextMenu";
            // Where to add the new menu in the current context menu.
            InsertBefore = "cm_preview";
            // Generate all of the context menu items...
            AddItem("cm_dxa_preview", "Preview Page in DXA", "DxaPreview");

            // We need to addd our resource group as a dependency to this extension
            Dependencies.Add<DxaPreviewResourceGroup>();

            // Actually apply our extension to a particular view.  You can have multiple.
            Apply.ToView(Constants.Views.DashboardView);
        }
    }
}
