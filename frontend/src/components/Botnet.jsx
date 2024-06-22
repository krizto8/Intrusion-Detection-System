import React from "react";
import "./AttacksData.css";
import Navbar from "./Navbar";

function Botnet() {
   return (
    <>
    <Navbar/>
    <div className="head">
        <div className="cont left1">
        <h1>Botnet</h1>
        </div>
        <div className="cont right1">
            <h5>Definition</h5>
            <p>Botnets are networks of hijacked computer devices used to carry out various scams and cyberattacks. The term “botnet” is formed from the word’s “robot” and “network.” Assembly of a botnet is usually the infiltration stage of a multi-layer scheme. The bots serve as a tool to automate mass attacks, such as data theft, server crashing, and malware distribution.

            <br/><br/>Botnets use your devices to scam other people or cause disruptions — all without your consent. You might ask, “what is a botnet attack and how does it work?” To expand this botnet definition, we’ll help you understand how botnets are made and how they are used.</p>
             <h5 >How Botnet Works</h5>
             <p>Botnets are built to grow, automate, and speed up a hacker’s ability to carry out larger attacks.One person or even a small team of hackers can only carry out so many actions on their local devices. But, at little cost and a bit of time invested, they can acquire tons of additional machines to leverage for more efficient operations.A bot herder leads a collective of hijacked devices with remote commands.<br/><br/> Once they’ve compiled the bots, a herder uses command programming to drive their next actions. The party taking command duties may have set up the botnet or be operating it as a rental.
             Zombie computers, or bots, refer to each malware-infected user device that’s been taken over for use in the botnet. These devices operate mindlessly under commands designed by the bot herder.</p>
             <h5>How to Protect Yourself from Botnets</h5>
             <p><ol>
                <li><span id="bold">Improve all user passwords for smart devices </span> Using complex and long passwords will help your devices stay safer than weak and short passwords.</li>
                <br/><li><span id="bold">Avoid buying devices with weak security</span> While this isn’t always easy to spot, many cheap smart home gadgets tend to prioritize user convenience over security. Research reviews on a product’s safety and security features before buying.</li>
                <br/><li><span id="bold">Update admin settings and passwords across all your devices</span> You’ll want to check all possible privacy and security options on anything that connects device-to-device or to the internet. Even smart refrigerators and Bluetooth-equipped vehicles have default manufacturer passwords to access their software systems. Without updates to custom login credentials and private connectivity, hackers can breach and infect each of your connected devices.</li>
                <br/><li><span id="bold">Never click links in any message you receive</span> Texts, emails, and social media messages can all be reliable vehicles for botnet malware. Manually entering the link into the address bar will help you avoid DNS cache poisoning and drive-by downloads. Also, take an extra step to search for an official version of the link.</li>
                </ol>
            </p>
        </div>
    </div>
    </>
   )
}

export default Botnet;