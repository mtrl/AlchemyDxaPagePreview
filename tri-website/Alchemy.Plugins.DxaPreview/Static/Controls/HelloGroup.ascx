<%@ Control Language="C#" %>
<%@ Import Namespace="Tridion.Web.UI" %>

<!-- This is an example of a drop down ribbon toolbar button. You assign the filename of this control in the RibbonToolbar's
     Group property. -->
<c:RibbonButton runat="server" CommandName="HelloWorld" IsDropdownButton="true" Title="Hello World" Label="Hello World" ID="HelloGroupBtn">
    <c:RibbonContextMenuItem runat="server" Command="ErrorTest" Title="Error Test" Label="Error Test" />
    <c:RibbonContextMenuItem runat="server" Command="GetApiVersion" Title="Get Api Version" Label="Get Api Version" />
    <c:RibbonContextMenuItem runat="server" Command="HelloWorld" Title="Hello World!" Label="Hello World!" />
    <c:RibbonContextMenuItem runat="server" Command="HelloSettings" Title="Settings" Label="Settings" />
</c:RibbonButton>
