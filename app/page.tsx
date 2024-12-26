'use client';
import { useState, useEffect, useRef } from 'react';

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [commands, setCommands] = useState<string[]>([]);
  const [outputs, setOutputs] = useState<(string | JSX.Element)[]>([]);
  const [suggestion, setSuggestion] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const availableCommands = ['help', 'about', 'projects', 'repo', 'ping' , 'date', 'echo', 'clear', 'joke', 'random'];

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }

    const handleClick = (event) => {
      if (inputRef.current && event.target !== inputRef.current) {
        inputRef.current.focus();
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [commands, outputs]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    const match = availableCommands.find((cmd) => cmd.startsWith(value));
    setSuggestion(match || '');
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      processCommand(inputValue);
      setInputValue('');
      setSuggestion('');
    } else if (event.key === 'Tab') {
      event.preventDefault();
      if (suggestion) {
        setInputValue(suggestion);
      }
    } else if (event.ctrlKey && event.key === 'h') {
      event.preventDefault();
      setCommands([]);
      setOutputs([]);
    }
  };

  const processCommand = (command) => {
    setCommands([...commands, command]);
    console.log(command);
    command = command.toLowerCase();
    if (command === 'help') {
      setOutputs([...outputs, helpMessage]);
    } else if (command === 'about') {
      setOutputs([...outputs, aboutMessage]);
    } else if (command === 'projects') {
      setOutputs([...outputs, projectsMessage]);
    } else if (command === 'repo') {
      setOutputs([...outputs, repoMessage]);
    } else if (command === 'ping') {
      setOutputs([...outputs, 'pong!']);
    } else if (command === 'date') {
      setOutputs([...outputs, new Date().toString()]);
    } else if (command.startsWith('echo ')) {
      setOutputs([...outputs, command.slice(5)]);
    } else if (command === 'clear') {
      setCommands([]);
      setOutputs([]);
    } else if (command === 'joke') {
      const jokes = [
        "Why do programmers prefer dark mode? Because light attracts bugs!",
        "How many programmers does it take to change a light bulb? None, that's a hardware problem.",
        "Why do Java developers wear glasses? Because they don't see sharp."
      ];
      const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
      setOutputs([...outputs, randomJoke]);
    } else if (command === 'random') {
      setOutputs([...outputs, Math.floor(Math.random() * 100).toString()]);
    } else {
      setOutputs([...outputs, `Invalid command '${command}'. Type 'help' for instructions.`]);
    }
  };


  const welcomeMessage = (
    <div className="mb-2">
      Oh good, you're here! Feel free to explore, type commands, and discover the secrets hidden within. <br/>Type <span className="glow">help</span> for instructions.
    </div>
  );

  const aboutMessage = (
    <span>
      Hello! My name is Christian. {'\n'}I am a computer science + math student at the University of Massachussets Amherst. {'\n'}I'm currently working as a research engineer at <a href="https://anthias.xyz" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">anthias.xyz</a>.
    </span>
  );

  const helpMessage = (
    <span>
      <span>Instructions:</span><br />
      <span className="ml-4">Type your commands and press Enter. You can even type a few letters and press [tab] to autocomplete.</span><br /><br />
      <span>Commands:</span><br />
      <span className="glow ml-4">help</span><br />
      <span className="ml-8">Summon this magical list of commands.</span><br />
      <span className="glow ml-4">about</span><br />
      <span className="ml-8">Learn more about me.</span><br />
      <span className="glow ml-4">projects</span><br />
      <span className="ml-8">Check out my latest and greatest projects.</span><br />
      <span className="glow ml-4">repo</span><br />
      <span className="ml-8">Visit my GitHub repository.</span><br />
      <span className="glow ml-4">clear</span><br />
      <span className="ml-8">Clear the current screen.</span>
    </span>
  );

  const projectsMessage = (
    <span>
      <span>Projects:</span><br /><br />
      <span className="glow ml-4">Anthias - </span>
      <a href="https://www.anthias.xyz" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">link</a><br />
      <span className="ml-8">
      Anthias Labs is a boutique on-chain advisory firm focused on DeFi risk management and system design. We protect protocols with boutique risk infrastructure and advisory.
      </span><br /><br />
      <span className="glow ml-4">UMass Club Golf Website - </span>
      <a href="https://umass-club-golf.vercel.app" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">link</a><br />
      <span className="ml-8">
        A website for the UMass Club Golf team, which I am a member of. Built with Next.js and Mantine.
      </span><br /><br />
      <span className="glow ml-4">Face Tracking Nerf Turret - </span>
      <a href="https://sites.google.com/umass.edu/cics256-final-project/home?authuser=4" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">link</a><br />
      <span className="ml-8">
      A sophisticated Nerf turret that utilizes OpenCV for facial tracking and is powered by an Arduino microcontroller.
      </span><br />
    </span>
  );

  const repoMessage = (
    <span>
      <a href="https://github.com/cnobleshriver" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">GitHub</a><br />
    </span>
  );

  return (
    <div id="root" className="h-screen cursor-default">
      <div id="container" className="h-full bg-gray-900 overflow-x-hidden overflow-y-auto">
        <div id="content" className="text-gray-400 flex flex-col font-mono p-5 whitespace-pre-wrap">
          <div id="banner" className="text-teal-500 text-4 font-bold mb-5 leading-4 glow" >
            <pre>
              {`
        __         _               __         _                
  _____/ /_  _____(_)____    _____/ /_  _____(_)   _____  _____
 / ___/ __ \\/ ___/ / ___/   / ___/ __ \\/ ___/ / | / / _ \\/ ___/
/ /__/ / / / /  / (__  )   (__  ) / / / /  / /| |/ /  __/ /    
\\___/_/ /_/_/  /_/____/   /____/_/ /_/_/  /_/ |___/\\___/_/     
                                                            @2024
              `}
            </pre>
          </div>
          {welcomeMessage}
          <div id="command-output" className="mt-4">
            {commands.map((cmd, index) => (
              <div key={index} className="text-white">
                <span>&gt;{cmd}</span>
                <div className="text-white mt-2">
                  {outputs[index]}
                </div>
              </div>
            ))}
          </div>
          <div id="input-area" className="flex items-center mt-4 cursor-text">
            <span id="prompt">&gt;</span>
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
              className="bg-transparent border-0 text-[#f0bf81] font-inherit text-inherit outline-none w-full ml-2"
            />
            {suggestion && suggestion !== inputValue && (
              <span className="text-gray-500 ml-2">{suggestion}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}