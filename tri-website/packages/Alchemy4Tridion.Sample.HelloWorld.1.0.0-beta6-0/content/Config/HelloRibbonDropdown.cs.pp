using Alchemy4Tridion.Plugins.GUI.Configuration;

namespace $rootnamespace$.Config
{
    /// <summary>
    /// Represents a ribbon tool bar that has drop down options.
    /// </summary>
    public class HelloRibbonDropDown : RibbonToolbarExtension
    {
        /// <summary>
        /// Constructor
        /// </summary>
        public HelloRibbonDropDown()
        {
            // The id of the element (overridden b/c the ascx in the Group property contains the Id)
            AssignId = "HelloRibbonToolbar";

            // The filename of the ascx user control that contains the button markup/controls.
            Group = "HelloGroup.ascx";

            // The name of the extension.
            Name = "Hello World";

            // Which Page tab the extension will go on.
            PageId = Constants.PageIds.HomePage;

            // Don't forget to add a dependency to the resource group that references the command set...
            Dependencies.Add<HelloResourceGroup>();

            // And apply it to a view.
            Apply.ToView(Constants.Views.DashboardView, "DashboardToolbar");
        }
    }
}
