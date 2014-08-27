---
title: "Updating AD FS SSL certificate on Windows Server 2012 R2"
author: rory woods
date: 2014-03-04 04:43:00-5
layout: post
categories: 
- ad fs
- adfs
- sso
- claims
---

Information on running Active Directory Federation Services on Windows Server 2012 R2 is still scant. Both TechNet and blog posts usually refer to IIS. However, ADFS on Windows Server 2012 R2 (I've seen people call it 2.1, 3.0 but don't know the official version) does not make use of IIS. Instead, it runs directly on the http.sys kernel-mode driver built into Windows.

Recently a client wished to change the name of the federation service. Documentation on this procedure is abundant. However, the service communication certificate must also be changed so that its Subject matches the new name. Once the certificate and private key are properly installed and permissioned the AD FS management UI offers a straight-forward way to change out the certificate used. But after doing this I could not get AD FS pages to load. The connection over HTTPS would be refused. Additionally, all directions around changing the service communication certificate referred to updating the cert used by the IIS Web Site. However, this no longer applies.

I had assumed AD FS would update its https.sys registrations to use the new service communication certificate. This did not happen in my case. Running the below in Powershell confirmed the old cert was still in use:

    Get-AdfsSslCertificate

I had to run the following Powershell to update the certificate used. 

    Set-AdfsSslCertificate -Thumbprint theThumbprintOfTheNewCert

To determine the thumbprint of a certificate:

 1. Open MMC with the Certificates snap-in [walk-through][1]
 2. Find the certificate you want to use, it should be in the Local Computer's Personal store
 3. Double-click the certificate, click the Details tab
 4. Scroll through the list of fields and click Thumbprint
 5. Copy the hex characters in the box and remove the spaces

  [1]: http://msdn.microsoft.com/en-us/library/ms788967%28v=vs.110%29.aspx