library pages;

<#list pageFiles as file>
export '${fix$(file)}';
</#list>