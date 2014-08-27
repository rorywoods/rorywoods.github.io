---
title: "Integrating New Relic with Windows Azure Web Sites"
author: rory woods
date: 2013-05-10 04:43:00-5
layout: post
categories: 
- azure
- new relic
---

Not days after New Relic told me they had no solution for monitoring of Azure Web Sites Scott Hanselman [blogs about how he set this up][1]. However, when I executed my usual git push azure master the deployment threw an error:

    remote: D:\Program Files (x86)\MSBuild\Microsoft\VisualStudio\v11.0\Web\
    Microsoft.Web.Publishing.targets(3094,5): error : Copying file 
    newrelic\NewRelic.Agent.Core.dll to C:\DWASFiles\Sites\solaflect-uplink-west\
    Temp\9483fb47-88b4-4652-9b8c-41b4cf034fd8\newrelic\NewRelic.Agent.Core.dll 
    failed. Could not find file 'newrelic\NewRelic.Agent.Core.dll'. [C:\DWASFiles\
    Sites\solaflect-uplink-west\VirtualDirectory0\site\repository\Uplink.Server\
    Uplink.Server.csproj]

Turns out the NuGet package copies some assemblies to the newrelic folder and adds them to the project file. However, my git repo is set to ignore .dll files. I thought the NuGet package restore would take care of placing them in the right spot on the server but I had to force add them to my git repo. All went well on the next deploy.

  [1]: http://www.hanselman.com/blog/PennyPinchingInTheCloudEnablingNewRelicPerformanceMonitoringOnWindowsAzureWebsites.aspx
