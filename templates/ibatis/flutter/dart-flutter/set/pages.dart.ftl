library integrades;

<#list pageFiles as file>
export '${fix$(file)}';
</#list>