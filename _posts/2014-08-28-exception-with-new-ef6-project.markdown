---
title: "EF6 Exception: The specified LocalDB instance does not exist on brand new project"
author: rory woods
date: 2014-08-28 16:58:00
layout: post
categories: 
- entity framework
- sql
---

On a new EF6 project I was getting an exception when first touching the context:
> A network-related or instance-specific error occurred while establishing a connection to SQL Server. The server was not found or was not accessible. Verify that the instance name is correct and that SQL Server is configured to allow remote connections. (provider: SQL Network Interfaces, error: 50 - Local Database Runtime error occurred. The specified LocalDB instance does not exist.

I expected EF to create the LocalDb database. A closer look at the exception reveals it's the *instance* that is missing. Upon installing the EF NuGet package the following is added to your web.config/app.config:

{% highlight xml %}
<defaultConnectionFactory type="System.Data.Entity.Infrastructure.LocalDbConnectionFactory, EntityFramework">
  <parameters>
    <parameter value="v12.0" />
  </parameters>
</defaultConnectionFactory>
{% endhighlight %}

Not sure how but I ended up with a SQL Server LocalDb update (VS 2013 update? SQL Server Data Tools?). This verion no longer automatically creates an instance named v*version number* (e.g. v11.0 or v12.0). Instead the default instance name is MSSQLLocalDb. This is [fixed in EF 6.1.1](https://entityframework.codeplex.com/workitem/2246) but many NuGet packages (e.g. ASP.NET Identity EntityFramework) target EF 6.1.0 and you'll end up with the minimal compatible version if you don't already have EF installed.
