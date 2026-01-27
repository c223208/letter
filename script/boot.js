//BIOSブート画面関連。シーケンス処理など

// BIOS Boot Sequence Logic
const bootSequence = async () => {
    const output = document.getElementById('boot-content');
    const bootScreen = document.getElementById('boot-screen');
    const cursor = document.getElementById('boot-cursor');
    
    const printLine = (text) => {
        const p = document.createElement('div');
        p.innerHTML = text === "" ? "&nbsp;" : text;
        output.appendChild(p);
        // Scroll the boot screen container, not the window
        bootScreen.scrollTop = bootScreen.scrollHeight; 
    };

    const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const appendToLastLine = (text) => {
        const lastLine = output.lastElementChild;
        if (lastLine) {
            lastLine.innerHTML += text;
        }
    };

    // --- Boot Sequence Start ---
    printLine("Award Modular BIOS v4.51PG, An Energy Star Ally");
    printLine("Copyright (C) 1984-1998, Award Software, Inc.");
    printLine("");
    printLine("PENTIUM-MMX CPU at 233MHz");
    
    const memLine = document.createElement('div');
    output.appendChild(memLine);
    
    let memory = 0;
    const maxMemory = 65536; 
    const step = 2048; 
    
    while (memory <= maxMemory) {
        memLine.innerHTML = `Memory Test : ${memory}K OK`;
        memory += step;
        await wait(20); 
    }
    await wait(400);

    printLine("");
    printLine("Award Plug and Play BIOS Extension v1.0A");
    printLine("Initialize Plug and Play Cards...");
    await wait(600);
    printLine("PNP Init Completed");
    printLine("");

    printLine("Detecting HDD Primary Master ...");
    await wait(800); 
    appendToLastLine(" WDC AC36400L");
    
    printLine("Detecting HDD Primary Slave  ...");
    await wait(300);
    appendToLastLine(" None");

    printLine("Detecting HDD Secondary Master ...");
    await wait(300);
    appendToLastLine(" TSSTcorp CDDVDW");

    printLine("Detecting HDD Secondary Slave  ...");
    await wait(200);
    appendToLastLine(" None");

    printLine("");
    await wait(1000);
    
    printLine("Verifying DMI Pool Data ........");
    await wait(800);
    appendToLastLine(" Update Success");
    printLine("Boot from ATAPI CD-ROM : Failure"); 
    printLine("Starting Windows 98...");
    
    await wait(1500);
    cursor.style.display = 'none'; 
    bootScreen.style.transition = 'opacity 0.5s ease-out';
    bootScreen.style.opacity = '0';
    
    setTimeout(() => {
        bootScreen.style.display = 'none';
    }, 500);
};
