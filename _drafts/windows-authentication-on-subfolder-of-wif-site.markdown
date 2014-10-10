---
title: Windows Authentication on subfolder of WIF Site
author: rory woods
layout: post
---

As part of a large Identity and Access Management project I moved an existing ASP.NET WebForms application to WIF and claims. All went well until we realized the site also hosts a WCF web service that, until now, depended on clients authenticating via Windows Authentication. We didn't want to force a change to token-based authentication on existing applications. The folder hosting the services needed to "opt-out" of WIF and Windows Auth challenge instead. After hours of web.config and IIS experimentation I discovered a way to make this work.

There are a few moving parts to this solution.

Turn on Windows Authentication in web.config
Disable Windows Authentication at root of web site in IIS, enable it just for the folder hosting the services
Capture the wsfed auth redirect event of WIF and cancel if the request is coming from the services folder

