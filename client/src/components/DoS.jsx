import React from "react";
import "./AttacksData.css";
import Navbar from "./Navbar";

function DoS() {
   return (
    <>
    <Navbar/>
    <div className="head">
        <div className="cont left1">
        <h1>DoS</h1>
        </div>
        <div className="cont right1">
            <h5>Definition</h5>
            <p>A Denial of Service (DoS) attack is a cyber-attack in which the perpetrator seeks to make a machine or network resource unavailable to its intended users by temporarily or indefinitely disrupting services of a host connected to the Internet. DoS attacks typically function by overwhelming or flooding a targeted machine with requests until normal traffic is unable to be processed, resulting in denial of service to additional requests.

            <br/><br/>Unlike a Distributed Denial of Service (DDoS) attack, which uses multiple attack sources, a DoS attack typically uses a single computer and a single internet connection to carry out the attack. The goal of both types of attacks, however, remains the same: to render the target system or resource unavailable.</p>
             <h5>How DoS Works</h5>
             <p>A DoS attack works by exploiting vulnerabilities in the target system or by overwhelming it with a flood of traffic. There are several methods an attacker might use to execute a DoS attack:

             <br/><br/>1. <span id="bold">Buffer Overflow Attacks:</span> The attacker sends more traffic to a network address than the programmers have built the system to handle. This overloads system memory, causing the system to crash.

             <br/><br/>2. <span id="bold">Flood Attacks:</span> The attacker sends a huge volume of traffic to a system, so much that it can't respond or crashes. Common flood attacks include ICMP floods and SYN floods.

             <br/><br/>3. <span id="bold">Ping of Death:</span> The attacker sends a malformed or otherwise malicious ping to a computer. A ping is normally 64 bytes in size; historically, many computer systems couldn't handle a ping larger than the maximum IP packet size, which is 65,535 bytes. Sending a ping of this size could crash the target system.

             <br/><br/>The success of a DoS attack doesn't just depend on the attacker's ability to generate malicious traffic, but also on the security posture and capacity of the target system.</p>
             <h5>How to Protect Yourself from DoS Attacks</h5>
             <p><ol>
                <li><span id="bold">Configure your network hardware properly:</span> Firewalls and routers should be configured to reject bogus traffic. This can help prevent some DoS attacks.</li>
                <br/><li><span id="bold">Keep systems patched and up to date:</span> Many DoS attacks exploit vulnerabilities in systems. Keeping your systems updated can prevent these vulnerabilities from being exploited.</li>
                <br/><li><span id="bold">Implement DoS protection services:</span> There are services available that can detect abnormal traffic flows and redirect traffic away from your network before it can impact your services.</li>
                <br/><li><span id="bold">Have a response plan ready:</span> Know what to do when an attack happens. This includes having a communication plan to notify users and stakeholders, and steps to mitigate and recover from the attack.</li>
                <br/><li><span id="bold">Monitor your network:</span> Implement tools to monitor your network traffic. This can help you detect and respond to attacks quickly.</li>
                </ol>
            </p>
        </div>
    </div>
    </>
   )
}

export default DoS;