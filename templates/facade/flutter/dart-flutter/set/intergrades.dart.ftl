library integrades;

<#list interFiles as file>
export '.${fix$(file)}';
</#list>