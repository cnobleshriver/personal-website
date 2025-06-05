"use client";
import { useState, useEffect, useRef } from "react";
import "./globals.css";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [commands, setCommands] = useState<string[]>([]);
  const [outputs, setOutputs] = useState<(string | JSX.Element)[]>([]);
  const [suggestion, setSuggestion] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  const availableCommands = [
    "help",
    "about",
    "projects",
    "repo",
    "ping",
    "date",
    "echo",
    "clear",
    "contact",
    "joke",
    "random",
    "ls",
    "sudo",
    "man"
  ];

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }

    const handleClick = (event: MouseEvent) => {
      if (inputRef.current && event.target !== inputRef.current) {
        inputRef.current.focus();
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [commands, outputs]);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [commands, outputs]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    const match = availableCommands.find((cmd) => cmd.startsWith(value));
    setSuggestion(match || "");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      processCommand(inputValue);
      setInputValue("");
      setSuggestion("");
    } else if (event.key === "Tab") {
      event.preventDefault();
      if (suggestion) {
        setInputValue(suggestion);
      }
    } else if (event.ctrlKey && event.key === "h") {
      event.preventDefault();
      setCommands([]);
      setOutputs([]);
    }
  };

  const processCommand = (command: string) => {
    setCommands([...commands, command]);
    console.log(command);
    command = command.toLowerCase();
    if (command === "help") {
      setOutputs([...outputs, helpMessage]);
    } else if (command === "about") {
      setOutputs([...outputs, aboutMessage]);
    } else if (command === "projects") {
      setOutputs([...outputs, projectsMessage]);
    } else if (command === "repo") {
      setOutputs([...outputs, repoMessage]);
      // } else if (command === 'research') {
      //   setOutputs([...outputs, resarchMessage]);
    } else if (command === "contact") {
      setOutputs([...outputs, contactMessage]);
    } else if (command === "ping") {
      setOutputs([...outputs, "pong!"]);
    } else if (command === "date") {
      setOutputs([...outputs, new Date().toString()]);
    } else if (command.startsWith("echo ")) {
      setOutputs([...outputs, command.slice(5)]);
    } else if (command === "clear") {
      setCommands([]);
      setOutputs([]);
    } else if (command === "ls") {
      setOutputs([
        ...outputs,
        "Very insightful of you... Fine, I'll list ALL available commands: \n" +
          availableCommands.join(", "),
      ]);
    } else if (command === "joke") {
      const jokes = [
        "Why do programmers prefer dark mode? Because light attracts bugs!",
        "How many programmers does it take to change a light bulb? None, thats a hardware problem.",
        "Why do Java developers wear glasses? Because they don't see sharp.",
      ];
      const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
      setOutputs([...outputs, randomJoke]);
    } else if (command === "random") {
      setOutputs([...outputs, Math.floor(Math.random() * 100).toString()]);
    } else if (command === "sudo") {
      setOutputs([
        ...outputs,
        "Nice try, but you don't have root privileges here!",
      ]);
    } else if (command === "man") {
      setOutputs([...outputs, "RTFM? Just kidding, type 'help' instead."]);
    } else {
      setOutputs([
        ...outputs,
        `Invalid command '${command}'. Type 'help' for instructions.`,
      ]);
    }
  };

  const welcomeMessage = (
    <div className="mb-2">
      Welcome, my friend! Feel free to explore, type commands, and discover the
      secrets hidden within... <br />
      Enter <span className="glow">&apos;help&apos;</span> for a list of
      available commands.
    </div>
  );

  const aboutMessage = (
    <span>
      Hello! My name is Chris. I&apos;m currently exploring the world of DeFi
      and blockchain technology, working as a research engineer at{" "}
      <a
        href="https://www.anthias.xyz"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 underline"
      >
        Anthias Labs
      </a>
      .
    </span>
  );

  const contactMessage = (
    <span>
      <span>Let&apos;s connect!</span>
      <br />
      <span className="glow ml-4">
        Email:{" "}
        <a
          href="mailto:cnobleshriver@gmail.com"
          className="text-blue-500 underline"
        >
          cnobleshriver@gmail.com
        </a>
      </span>
    </span>
  );

  const helpMessage = (
    <span>
      <span>Instructions:</span>
      <br />
      <span className="ml-4">
        Type your commands and press Enter. You can even type a few letters and
        press [tab] to autocomplete.
      </span>
      <br />
      <br />
      <span>Commands:</span>
      <br />
      <span className="glow ml-4">help</span>
      <br />
      <span className="ml-8">Summon this magical list of commands.</span>
      <br />
      <span className="glow ml-4">about</span>
      <br />
      <span className="ml-8">Learn more about me.</span>
      <br />
      <span className="glow ml-4">projects</span>
      <br />
      <span className="ml-8">Check out my latest and greatest projects.</span>
      <br />
      <span className="glow ml-4">repo</span>
      <br />
      <span className="ml-8">Visit my GitHub repository.</span>
      <br />
      {/* <span className="glow ml-4">research</span><br />
      <span className="ml-8">View my essays and research.</span><br /> */}
      <span className="glow ml-4">contact</span>
      <br />
      <span className="ml-8">Reach out to me!</span>
      <br />
      <span className="glow ml-4">clear</span>
      <br />
      <span className="ml-8">Clear the current screen.</span>
    </span>
  );

  const projectsMessage = (
    <span>
      <span>Projects:</span>
      <br />
      <br />
      <span className="glow ml-4">Anthias - </span>
      <a
        href="https://www.anthias.xyz"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 underline"
      >
        link
      </a>
      <br />
      <span className="ml-8">
        Anthias Labs is a boutique on-chain advisory firm focused on DeFi risk
        management and system design.
      </span>
      <br />
      <br />
      <span className="glow ml-4">UMass Club Golf Website - </span>
      <a
        href="https://umass-club-golf.vercel.app"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 underline"
      >
        link
      </a>
      <br />
      <span className="ml-8">
        A website for the UMass Club Golf team, which I am a member of. Built
        with Next.js and Mantine.
      </span>
      <br />
      <br />
      <span className="glow ml-4">Face Tracking Nerf Turret - </span>
      <a
        href="https://sites.google.com/umass.edu/cics256-final-project/home?authuser=4"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 underline"
      >
        link
      </a>
      <br />
      <span className="ml-8">
        A Nerf-dart-shooting turret that utilizes OpenCV for facial tracking and
        is powered by an Arduino microcontroller.
      </span>
      <br />
    </span>
  );

  // const resarchMessage = (
  //   <span>
  //   <span>Research:</span><br /><br />
  //   <span className="glow ml-4">Adrena&apos;s Fee Structure: A Competitive Analysis in the Perpetual DEX Market - </span>
  //   <a href="https://lava-cheetah-7ac.notion.site/Adrena-s-Fee-Structure-A-Competitive-Analysis-in-the-Perpetual-DEX-Market-2f97813652384d93873ef4f388fce6e5" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">link</a><br />
  //   <span className="glow ml-4">Insights into Toxic Flow - </span>
  //   <a href="https://lava-cheetah-7ac.notion.site/Insights-Into-Toxic-Flow-17b1d879b94680df9f1fdee25ec7bc2c?pvs=74" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">link</a><br />
  //   <span className="glow ml-4">Ebisu Risk Assessment & Parameter Recommendations - </span>
  //   <a href="/Ebisu_Final_deliverable.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">link</a><br />
  //   </span>
  // );

  const repoMessage = (
    <span>
      <span>Check out my GitHub repositories: </span>
      <a
        href="https://github.com/cnobleshriver"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 underline"
      >
        GitHub
      </a>
      <br />
    </span>
  );

  return (
    <div id="root" className="h-screen cursor-default">
      <div
        id="container"
        className="h-full bg-gray-900 overflow-x-hidden overflow-y-auto"
        ref={outputRef}
      >
        <div
          id="content"
          className="text-gray-400 flex flex-col font-mono p-5 whitespace-pre-wrap"
        >
          <div
            id="banner"
            className="text-teal-500 text-4 font-bold mb-5 leading-4 glow ascii-art"
          >
            <pre>
              {`
        __         _               __         _                
  _____/ /_  _____(_)____    _____/ /_  _____(_)   _____  _____
 / ___/ __ \\/ ___/ / ___/   / ___/ __ \\/ ___/ / | / / _ \\/ ___/
/ /__/ / / / /  / (__  )   (__  ) / / / /  / /| |/ /  __/ /    
\\___/_/ /_/_/  /_/____/   /____/_/ /_/_/  /_/ |___/\\___/_/     
                                                            @2025
              `}
            </pre>
          </div>
          {welcomeMessage}
          <div id="command-output" className="mt-4">
            {commands.map((cmd, index) => (
              <div key={index} className="text-white">
                <span>&gt;{cmd}</span>
                <div className="text-white mt-2">{outputs[index]}</div>
              </div>
            ))}
          </div>
          <div id="input-area" className="flex items-center mt-4 cursor-text">
            <span id="prompt">&gt;</span>
            <div className="relative w-full">
              {suggestion && suggestion !== inputValue && (
                <span className="text-gray-500 absolute left-2 z-10">
                  {suggestion}
                </span>
              )}
              <input
                id="input"
                type="text"
                name="input"
                spellCheck="false"
                autoCapitalize="off"
                autoComplete="off"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                ref={inputRef}
                className="bg-transparent border-0 text-[#f0bf81] font-inherit text-white outline-none w-full ml-2 pl-0 relative z-20"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
