using Alchemy4Tridion.Plugins;

namespace Alchemy.Plugins.DxaPreview
{
    /// <summary>
    /// Required entry class that represents your plugin. 
    /// </summary>
    /// <remarks>
    /// No overrides or anything is needed unless your plugin's functionality requires new
    /// methods or properties. Feel free to the class to your liking.
    /// </remarks>
    public class AlchemyPlugin : AlchemyPluginBase
    {
        /// <summary>
        /// Optional override of Configure method if you want to add your own plugin utilities
        /// or to set custom options on existing ones.
        /// </summary>
        /// <param name="services">The strongly typed services.</param>
        public override void Configure(IPluginServiceLocator services)
        {
            services.SettingsEncryptor.EncryptionKey = "MyCustomKey";
        }
    }
}