import React from "react";
import "./AttacksData.css";
import Navbar from "./Navbar";

function DDoS() {
   return (
    <>
    <Navbar/>
    <div className="head">
        <div className="cont left1">
        <h1>DDoS</h1>
        </div>
        <div className="cont right1">
            <h5>Definition</h5>
            <p>A Distributed Denial of Service (DDoS) attack is a malicious attempt to disrupt the normal traffic of a targeted server, service or network by overwhelming the target or its surrounding infrastructure with a flood of Internet traffic. DDoS attacks achieve effectiveness by utilizing multiple compromised computer systems as sources of attack traffic. Exploited machines can include computers and other networked resources such as IoT devices.

            <br/><br/>From a high level, a DDoS attack is like an unexpected traffic jam clogging up the highway, preventing regular traffic from arriving at its desired destination. DDoS attacks are a subclass of denial of service (DoS) attacks. What makes a DDoS attack different from a DoS attack is the source of the flood. A DoS attack typically uses one computer and one Internet connection to flood a targeted system or resource. A DDoS attack, on the other hand, uses multiple computers and Internet connections to flood the targeted resource.</p>
             <h5>How DDoS Works</h5>
             <p>A DDoS attack requires an attacker to gain control of a network of online machines in order to carry out an attack. Computers and other machines (such as IoT devices) are infected with malware, turning each one into a bot (or zombie). The attacker then has remote control over the group of bots, which is called a botnet.

             <br/><br/>Once a botnet is established, the attacker can direct the machines by sending updated instructions to each bot via a method of remote control. When the IP address of a victim is targeted by the botnet, each bot will respond by sending requests to the target, potentially causing the targeted server or network to overflow capacity, resulting in a denial-of-service to normal traffic.

             <br/><br/>Because each bot is a legitimate Internet device, separating the attack traffic from normal traffic can be difficult. There are different types of DDoS attacks, including volumetric attacks, protocol attacks, and application layer attacks. Each type aims to overwhelm the target in a different way.</p>
             <h5>How to Protect Yourself from DDoS Attacks</h5>
             <p><ol>
                <li><span id="bold">Develop a DDoS response plan:</span> Having a plan in place before an attack occurs can help minimize damage and recovery time. This plan should include steps for identifying an attack, alerting the necessary personnel, and implementing mitigation strategies.</li>
                <br/><li><span id="bold">Use a Web Application Firewall (WAF):</span> A WAF can help filter out malicious traffic before it reaches your servers. It acts as a shield between your web applications and the Internet, providing an additional layer of security.</li>
                <br/><li><span id="bold">Leverage cloud-based DDoS protection:</span> Cloud-based solutions can absorb and filter large amounts of traffic before it reaches your network. These services often have large-scale infrastructure capable of handling massive DDoS attacks.</li>
                <br/><li><span id="bold">Monitor your network traffic:</span> Regular monitoring can help you identify unusual patterns that might indicate an impending attack. Implementing network monitoring tools can provide early warning signs of a DDoS attack.</li>
                <br/><li><span id="bold">Keep your systems updated:</span> Regularly update and patch your systems to protect against known vulnerabilities that could be exploited in a DDoS attack. This includes not only your servers but also all network devices and security software.</li>
                </ol>
            </p>
        </div>
    </div>
    </>
   )
}

export default DDoS;