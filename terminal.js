/* Dual-engine interactive terminal with browser-supported Linux-mode commands. */
(() => {
  const $ = (id) => document.getElementById(id),
    term = $("live-terminal"),
    input = $("terminal-input"),
    out = $("terminal-output"),
    prompt = $("terminal-prompt"),
    modeLabel = $("terminal-mode");
  const toggle = $("terminal-toggle"),
    close = $("terminal-close"),
    form = $("terminal-form");
  if (!term || !toggle) return;
  const startedAt = Date.now(),
    aliases = {},
    env = { SHELL: "portfolio-terminal", HOME: "/home/guest" };
  let stopMatrixEffect = null;
  let mode = "basic",
    history = [],
    cursor = 0,
    files = {
      "readme.txt": "Welcome to the in-browser terminal workspace.",
      "mission.md": "Make security legible. Ship fixes, not just findings.",
    },
    dirs = new Set(["projects", "logs", "tmp"]);
  const commands = [
    "help",
    "clear",
    "exit",
    "date",
    "uptime",
    "whoami",
    "uname",
    "history",
    "pwd",
    "ls",
    "cat",
    "grep",
    "tail",
    "head",
    "less",
    "touch",
    "mkdir",
    "rm",
    "cp",
    "mv",
    "find",
    "sed",
    "awk",
    "alias",
    "env",
    "export",
    "echo",
    "hash",
    "base64",
    "passgen",
    "uuid",
    "sysinfo",
    "calc",
    "matrix",
    "cowsay",
    "fortune",
  ];
  const say = (text = "", type = "") => {
    const line = document.createElement("div");
    line.className = `terminal-line ${type}`;
    line.textContent = text;
    out.append(line);
    out.scrollTop = out.scrollHeight;
  };
  const setMode = (next) => {
    mode = next;
    modeLabel.textContent = next;
    prompt.textContent =
      next === "linux" ? "root@secops:~#" : "visitor@portfolio:~$";
  };
  const open = () => {
    term.classList.remove("hidden");
    term.setAttribute("aria-hidden", "false");
    toggle.setAttribute("aria-pressed", "true");
    document.body.classList.add("no-scroll");
    input.focus();
    if (!out.childElementCount)
      say(
        "Portfolio terminal ready. Type help for commands.",
        "terminal-success",
      );
  };
  const shut = () => {
    term.classList.add("hidden");
    term.setAttribute("aria-hidden", "true");
    toggle.setAttribute("aria-pressed", "false");
    document.body.classList.remove("no-scroll");
  };
  const startMatrixEffect = () => {
    if (stopMatrixEffect) return stopMatrixEffect();
    const canvas = document.createElement("canvas");
    canvas.id = "matrix-canvas";
    const stop = document.createElement("button");
    stop.id = "matrix-stop";
    stop.type = "button";
    stop.textContent = "STOP MATRIX [ESC]";
    document.body.append(canvas, stop);
    const ctx = canvas.getContext("2d");
    const katakana =
      "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレゲゼデベペオォコソトノホモヨョロゴゾドボポヴッン";
    const alphabet = katakana + "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const fontSize = 16;
    let drops = [];
    const resize = () => {
      canvas.width = innerWidth;
      canvas.height = innerHeight;
      drops = Array(Math.ceil(canvas.width / fontSize)).fill(1);
    };
    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#0F0";
      ctx.font = `${fontSize}px monospace`;
      drops.forEach((drop, i) => {
        ctx.fillText(
          alphabet.charAt(Math.floor(Math.random() * alphabet.length)),
          i * fontSize,
          drop * fontSize,
        );
        if (drop * fontSize > canvas.height && Math.random() > 0.975)
          drops[i] = 0;
        drops[i]++;
      });
    };
    const interval = setInterval(draw, 33);
    const exit = (event) => {
      if (
        event.key === "Escape" ||
        (event.ctrlKey && event.key.toLowerCase() === "c")
      )
        cleanup();
    };
    const cleanup = () => {
      clearInterval(interval);
      canvas.remove();
      stop.remove();
      removeEventListener("resize", resize);
      document.removeEventListener("keydown", exit);
      stopMatrixEffect = null;
      say("Matrix effect stopped.", "terminal-success");
    };
    stopMatrixEffect = cleanup;
    resize();
    addEventListener("resize", resize);
    document.addEventListener("keydown", exit);
    stop.addEventListener("click", cleanup);
    say(
      "Digital rain enabled. Use Stop Matrix, Escape, Ctrl+C, or matrix to stop it.",
      "terminal-success",
    );
  };
  const matrix = startMatrixEffect;
  const basic = async (raw) => {
    let [cmd, ...args] = raw.split(/\s+/),
      arg = args.join(" "),
      lower = raw.toLowerCase();
    if (!raw || cmd === "help")
      return say(
        "BASIC\n theme dark|light|toggle  layout classic|modern  color accent #hex|reset\n goto about|experience|projects|contact | top | project ls|open [name]|close\n contact email | flip | xray | matrix | destroy | clear | exit | su linux",
      );
    if (cmd === "clear") return out.replaceChildren();
    if (cmd === "exit") return shut();
    if (lower === "su linux") {
      setMode("linux");
      return say("Linux subsystem online. Type help.", "terminal-success");
    }
    if (cmd === "theme" && ["dark", "light", "toggle"].includes(args[0])) {
      let v =
        args[0] === "toggle"
          ? document.documentElement.dataset.theme === "dark"
            ? "light"
            : "dark"
          : args[0];
      document.documentElement.dataset.theme = v;
      return say(`Theme: ${v}.`, "terminal-success");
    }
    if (cmd === "layout" && ["classic", "modern"].includes(args[0])) {
      window.setLayout?.(args[0]);
      return say(`Layout: ${args[0]}.`, "terminal-success");
    }
    if (cmd === "color" && args[0] === "reset") {
      document.documentElement.style.removeProperty("--accent");
      return say("Accent reset.", "terminal-success");
    }
    if (
      cmd === "color" &&
      args[0] === "accent" &&
      /^#[\da-f]{6}$/i.test(args[1] || "")
    ) {
      document.documentElement.style.setProperty("--accent", args[1]);
      return say(`Accent: ${args[1]}.`, "terminal-success");
    }
    if (
      cmd === "goto" &&
      ["about", "experience", "projects", "contact"].includes(args[0])
    ) {
      document.getElementById(args[0])?.scrollIntoView({ behavior: "smooth" });
      return say(`Navigating to ${args[0]}.`, "terminal-success");
    }
    if (cmd === "top") {
      scrollTo({ top: 0, behavior: "smooth" });
      return say("Navigating to top.", "terminal-success");
    }
    if (lower === "project ls")
      return say(
        [
          "ShadowScan",
          "RedTeam CTF Toolkit",
          "CipherVault",
          "SOC Dashboard",
          "PhishNet Simulator",
          "SecureChat",
          "PerimeterMapper",
          "WebPen Recon Suite",
        ].join("\n"),
      );
    if (lower.startsWith("project open ")) {
      let name = arg.slice(5);
      window.openProjectModal?.(name);
      return say(`Opening ${name}.`, "terminal-success");
    }
    if (lower === "project close") {
      window.closeModal?.();
      return say("Project closed.", "terminal-success");
    }
    if (lower === "contact email") {
      window.copyEmail?.();
      return say("Email copied.", "terminal-success");
    }
    if (["flip", "xray"].includes(cmd)) {
      document.body.classList.toggle(`terminal-${cmd}`);
      return say(`${cmd} toggled.`, "terminal-success");
    }
    if (cmd === "matrix") return matrix();
    if (cmd === "destroy") {
      let p = document.createElement("div");
      p.className = "kernel-panic";
      p.textContent =
        "FATAL ERROR: SYSTEM DESTROYED BY USER\n\nREBOOT REQUIRED\nPress F5 or refresh the page to reboot.";
      document.body.replaceChildren(p);
      return;
    }
    say(`basic: command not found: ${cmd}`, "terminal-error");
  };
  const hash = async (text, algo) => {
    let b = await crypto.subtle.digest(algo, new TextEncoder().encode(text));
    return [...new Uint8Array(b)]
      .map((x) => x.toString(16).padStart(2, "0"))
      .join("");
  };
  const linux = async (raw) => {
    let [cmd, ...args] = raw.split(/\s+/),
      arg = args.join(" "),
      file = (args[0] || "").replace(/^\//, "");
    if (!raw) return;
    if (cmd === "clear") return out.replaceChildren();
    if (cmd === "exit") {
      setMode("basic");
      return say("Logged out of Linux subsystem.", "terminal-success");
    }
    if (cmd === "help")
      return say(
        `LINUX COMMANDS\n${commands.join("  ")}\n\nCommands operate only on this terminal's in-browser workspace.`,
      );
    if (cmd === "whoami") {
      say(
        `User: guest${Math.floor(Math.random() * 991) + 10}\nFetching public network profile…`,
      );
      try {
        let d = await fetch("https://ipapi.co/json/").then((r) =>
          r.ok ? r.json() : Promise.reject(),
        );
        return say(
          `Public IP: ${d.ip || "unavailable"}\nCity: ${d.city || "unavailable"}\nCountry: ${d.country_name || "unavailable"}\nISP: ${d.org || "unavailable"}`,
          "terminal-success",
        );
      } catch {
        return say(
          "Public profile unavailable (network request blocked or service unavailable).",
          "terminal-error",
        );
      }
    }
    if (cmd === "date") return say(new Date().toString());
    if (cmd === "uptime")
      return say(
        `terminal session: ${Math.floor((Date.now() - startedAt) / 1000)} seconds`,
      );
    if (cmd === "uname")
      return say(
        `${navigator.platform || "Unknown platform"} | ${navigator.userAgent}`,
      );
    if (cmd === "history")
      return say(history.map((x, i) => `${i + 1}  ${x}`).join("\n"));
    if (cmd === "pwd") return say("/home/guest");
    if (cmd === "ls")
      return say(
        [...dirs]
          .map((x) => x + "/")
          .concat(Object.keys(files))
          .join("  "),
      );
    if (["cat", "less", "head", "tail"].includes(cmd)) {
      if (!(file in files))
        return say(`${cmd}: ${file}: No such file`, "terminal-error");
      let l = files[file].split("\n");
      return say(
        (cmd === "head"
          ? l.slice(0, 10)
          : cmd === "tail"
            ? l.slice(-10)
            : l
        ).join("\n"),
      );
    }
    if (cmd === "grep") {
      let t = files[args[1]] || "";
      return say(
        t
          .split("\n")
          .filter((x) => x.includes(args[0] || ""))
          .join("\n"),
      );
    }
    if (cmd === "touch") {
      files[file] ??= "";
      return say(`created ${file}`);
    }
    if (cmd === "mkdir") {
      dirs.add(file);
      return say(`created ${file}/`);
    }
    if (cmd === "rm") {
      delete files[file];
      dirs.delete(file);
      return say(`removed ${file}`);
    }
    if (["cp", "mv"].includes(cmd)) {
      if (!(file in files) || !args[1])
        return say(
          `${cmd}: source or destination is invalid`,
          "terminal-error",
        );
      files[args[1]] = files[file] || "";
      if (cmd === "mv") delete files[file];
      return say(`${cmd} complete`);
    }
    if (cmd === "find") {
      const needle = (args[0] || "").toLowerCase();
      return say(
        [...dirs, ...Object.keys(files)]
          .filter((name) => name.toLowerCase().includes(needle))
          .join("\n"),
      );
    }
    if (cmd === "sed") {
      const [expression, target] = args;
      const match = /^s\/(.*?)\/(.*?)\/$/.exec(expression || "");
      if (!match || !(target in files))
        return say("sed: use sed s/old/new/ file", "terminal-error");
      files[target] = files[target].replaceAll(match[1], match[2]);
      return say(files[target]);
    }
    if (cmd === "awk") {
      const [field, target] = args;
      const number = Number(field?.replace("$", ""));
      if (!Number.isInteger(number) || !(target in files))
        return say("awk: use awk $1 file", "terminal-error");
      return say(
        files[target]
          .split("\n")
          .map((line) => line.trim().split(/\s+/)[number - 1] || "")
          .join("\n"),
      );
    }
    if (cmd === "alias") {
      if (!arg)
        return say(
          Object.entries(aliases)
            .map(([name, value]) => `${name}=${value}`)
            .join("\n"),
        );
      const [name, ...value] = arg.split("=");
      if (!name || !value.length)
        return say("alias: use alias name=value", "terminal-error");
      aliases[name] = value.join("=");
      return say(`alias ${name} set`);
    }
    if (cmd === "env")
      return say(
        Object.entries(env)
          .map(([key, value]) => `${key}=${value}`)
          .join("\n"),
      );
    if (cmd === "export") {
      const [key, ...value] = arg.split("=");
      if (!key || !value.length)
        return say("export: use export NAME=value", "terminal-error");
      env[key] = value.join("=");
      return say(`${key} exported`);
    }
    if (cmd === "hash") {
      if (args[0] === "md5")
        return say(
          "hash: MD5 is unavailable in the browser. Use hash sha256 <text>.",
          "terminal-error",
        );
      const text =
        (args[0] === "sha256" ? args.slice(1) : args).join(" ") || "portfolio";
      return say(`sha256: ${await hash(text, "SHA-256")}`);
    }
    if (cmd === "base64") {
      try {
        return say(
          args[0] === "-d" ? atob(args.slice(1).join(" ")) : btoa(arg),
        );
      } catch {
        return say("base64: invalid input", "terminal-error");
      }
    }
    if (cmd === "passgen")
      return say(crypto.randomUUID().replaceAll("-", "") + "!");
    if (cmd === "uuid") return say(crypto.randomUUID());
    if (cmd === "calc") {
      if (!/^[\d+*/%().\s-]+$/.test(arg))
        return say("calc: numeric expressions only", "terminal-error");
      try {
        return say(String(Function(`return (${arg})`)()));
      } catch {
        return say("calc: invalid expression", "terminal-error");
      }
    }
    if (cmd === "matrix") return matrix();
    if (cmd === "cowsay")
      return say(
        ` ${"_".repeat(arg.length + 2)}\n< ${arg || "moo"} >\n ${"-".repeat(arg.length + 2)}\n        \\   ^__^\n         \\  (oo)\\_______\n            (__)\\       )\\/\\`,
      );
    if (cmd === "fortune")
      return say(
        [
          "Trust, but verify.",
          "Security is a process, not a product.",
          "Curiosity is the best debugger.",
        ][Math.floor(Math.random() * 3)],
      );
    if (cmd === "echo")
      return say(arg.replace(/\$(\w+)/g, (_, key) => env[key] || ""));
    if (cmd === "sysinfo")
      return say(
        `Platform: ${navigator.platform || "unknown"}\nLanguage: ${navigator.language}\nViewport: ${innerWidth}×${innerHeight}\nOnline: ${navigator.onLine}`,
      );
    say(`linux: command not found: ${cmd}`, "terminal-error");
  };
  const run = async (raw) => {
    raw = raw.trim();
    if (!raw) return;
    const [name, ...rest] = raw.split(/\s+/);
    if (mode === "linux" && aliases[name])
      raw = `${aliases[name]} ${rest.join(" ")}`.trim();
    say(`${prompt.textContent} ${raw}`, "terminal-command");
    history.push(raw);
    cursor = history.length;
    await (mode === "linux" ? linux(raw) : basic(raw));
  };
  toggle.onclick = () => (term.classList.contains("hidden") ? open() : shut());
  close.onclick = shut;
  form.onsubmit = (e) => {
    e.preventDefault();
    let v = input.value;
    input.value = "";
    run(v);
  };
  input.onkeydown = (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      input.value = history[Math.max(0, --cursor)] || "";
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      input.value = history[Math.min(history.length, ++cursor)] || "";
    }
  };
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !term.classList.contains("hidden")) shut();
  });
})();
