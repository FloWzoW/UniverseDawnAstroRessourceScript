// ==UserScript==
// @name         Universe Dawn Fleet Asteroid Replacer
// @namespace    http://tampermonkey.net/
// @version      1.5
// @author       FloWzoW - flozi.dev
// @description  Ersetzt bestimmte Namen in der Fleet-Tabelle bei DOM-Änderungen
// @match        https://universe-dawn.com/game/space/spacecraft/fleets/*
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  // --------------------------------------------
  // 🔧 Konfiguration – hier Text-Ersetzungen eintragen
  // --------------------------------------------
  const replacements = [
    { from: "Agate Apex", to: "Silicium" },
    { from: "Agrarian Atoll", to: "Food" },
    { from: "Alloy Altar", to: "Aluminium" },
    { from: "Alum Quarry", to: "Bauxit" },
    { from: "Alumina Aerie", to: "Aluminium" },
    { from: "Ananke Cluster", to: "Titan" },
    { from: "Aqua Abyss", to: "Water" },
    { from: "Argent Apex", to: "Aluminium" },
    { from: "Atomic Atoll", to: "Uranium" },
    { from: "Atomic Apex", to: "Plutonium" },
    { from: "Atlas Peak", to: "Titan" },
    { from: "Aurora Arc", to: "Helium" },
    { from: "Bauxite Bastion", to: "Aluminium" },
    { from: "Bauxite Bluff", to: "Bauxit" },
    { from: "Bounty Bay", to: "Food" },
    { from: "Calypso's Domain", to: "Titan" },
    { from: "Cascade Cluster", to: "Water" },
    { from: "Chain Reaction Cove", to: "Plutonium" },
    { from: "Chalcedony Crest", to: "Silicium" },
    { from: "Corona Cleft", to: "Helium" },
    { from: "Corundum Cove", to: "Bauxit" },
    { from: "Critical Mass Mesa", to: "Plutonium" },
    { from: "Crystal Haven", to: "Silicium" },
    { from: "Deuterium Domain", to: "Hydrogen" },
    { from: "Diaspore Dell", to: "Bauxit" },
    { from: "Duralumin Domain", to: "Aluminium" },
    { from: "Eden Enclave", to: "Food" },
    { from: "Elemental Edge", to: "Hydrogen" },
    { from: "Eos Edge", to: "Helium" },
    { from: "Ferruginous Field", to: "Bauxit" },
    { from: "Fertile Frontier", to: "Food" },
    { from: "Fission Field", to: "Uranium" },
    { from: "Fission Fount", to: "Plutonium" },
    { from: "Flint Forge", to: "Silicium" },
    { from: "Foil Forest", to: "Aluminium" },
    { from: "Fusion Drift", to: "Helium" },
    { from: "Fusion Field", to: "Helium" },
    { from: "Fusion Frontier", to: "Hydrogen" },
    { from: "Gaia's Garden", to: "Food" },
    { from: "Garnet Gully", to: "Bauxit" },
    { from: "Half-life Haven", to: "Plutonium" },
    { from: "Harvest Haven", to: "Food" },
    { from: "Heliopause Hollow", to: "Hydrogen" },
    { from: "Helios Drift", to: "Helium" },
    { from: "Hematite Hollow", to: "Bauxit" },
    { from: "Hydro Haven", to: "Water" },
    { from: "Hydrogen Haven", to: "Hydrogen" },
    { from: "Hyperion's Vein", to: "Titan" },
    { from: "Iapetus Core", to: "Titan" },
    { from: "Isotope Isle", to: "Uranium" },
    { from: "Isotopic Isle", to: "Hydrogen" },
    { from: "Jasper Junction", to: "Silicium" },
    { from: "Kronos Ridge", to: "Titan" },
    { from: "Lumina Ledge", to: "Helium" },
    { from: "Lustrous Lagoon", to: "Aluminium" },
    { from: "Marine Maze", to: "Water" },
    { from: "Metallic Mesa", to: "Aluminium" },
    { from: "Nebula Niche", to: "Hydrogen" },
    { from: "Nebula Nook", to: "Helium" },
    { from: "Neptunium Nook", to: "Uranium" },
    { from: "Neptune's Niche", to: "Water" },
    { from: "Nereus Node", to: "Water" },
    { from: "Nourish Nebula", to: "Food" },
    { from: "Nuclear Nexus", to: "Uranium" },
    { from: "Nucleus Niche", to: "Plutonium" },
    { from: "Oasis Orb", to: "Food" },
    { from: "Obsidian Oath", to: "Silicium" },
    { from: "Oceanic Oasis", to: "Water" },
    { from: "Opaline Orb", to: "Silicium" },
    { from: "Ore Oasis", to: "Bauxit" },
    { from: "Oresight Orbit", to: "Aluminium" },
    { from: "Pelagic Point", to: "Water" },
    { from: "Plutonium Pinnacle", to: "Plutonium" },
    { from: "Plutonium Plateau", to: "Plutonium" },
    { from: "Prometheus Shard", to: "Titan" },
    { from: "Proton Peak", to: "Hydrogen" },
    { from: "Protium Plain", to: "Hydrogen" },
    { from: "Quantum Quay", to: "Hydrogen" },
    { from: "Quartz Nexus", to: "Silicium" },
    { from: "Radiant Range", to: "Plutonium" },
    { from: "Radiant Realm", to: "Helium" },
    { from: "Radioactive Realm", to: "Uranium" },
    { from: "Radium Ridge", to: "Uranium" },
    { from: "Reactor Rift", to: "Plutonium" },
    { from: "Redstone Ridge", to: "Bauxit" },
    { from: "Rhea's Bounty", to: "Titan" },
    { from: "Ruby Reef", to: "Bauxit" },
    { from: "Sapphire Spire", to: "Aluminium" },
    { from: "Silica Spire", to: "Silicium" },
    { from: "Solaris Sphere", to: "Helium" },
    { from: "Solstice Strand", to: "Helium" },
    { from: "Space Debris", to: "Mixed (Debris)" },
    { from: "Split Sphere", to: "Plutonium" },
    { from: "Sustenance Sphere", to: "Food" },
    { from: "Tethys Rift", to: "Titan" },
    { from: "Thalassa Thicket", to: "Water" },
    { from: "Thorium Thicket", to: "Uranium" },
    { from: "Titanus Aeternum", to: "Titan" },
    { from: "Trident Trough", to: "Water" },
    { from: "Uranium Utopia", to: "Uranium" },
    { from: "Verdant Vista", to: "Food" },
    { from: "Vitrum Vale", to: "Silicium" },
  ];

  const highlightColor = "#dcb874"; // Astro-Farbe
  const highlightClass = "ud-dmreplacer-highlight";

  // --------------------------------------------
  // 💅 CSS-Styles für Hervorhebung & Animation
  // --------------------------------------------
  (function injectStyle() {
    const css = `
      .${highlightClass} { color: ${highlightColor} !important; font-weight: 700 !important; }
      .${highlightClass}.ud-animate { animation: ud-flash 900ms ease; }
      @keyframes ud-flash {
        0% { background-color: rgba(124,252,0,0.2); }
        100% { background-color: transparent; }
      }
    `;
    const s = document.createElement("style");
    s.textContent = css;
    document.head.appendChild(s);
  })();

  // --------------------------------------------
  // 🧭 Tabelle finden
  // --------------------------------------------
  function findFleetTable() {
    // Direkt die Tabelle innerhalb des bekannten Containers nehmen
    const table = document.querySelector(
      '[class*="navbar_pcoded-main-container"]'
    );
    return table || null;
  }

  // --------------------------------------------
  // 🔍 Text-Ersetzung im DOM
  // --------------------------------------------
  function replaceInTextNodes(root) {
    if (!root) return;

    const table = root.querySelector('div[data-tourid="fleet-scan"] table');
    if (!table) return;

    const walker = document.createTreeWalker(
      table,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );

    let node;
    while ((node = walker.nextNode())) {
      let text = node.nodeValue;
      if (!text || !text.trim()) continue;

      const parent = node.parentElement;
      if (!parent) continue;

      // Prüfen, ob das Elternelement bereits animiert
      if (parent.classList.contains("ud-animate")) {
        continue; // überspringen, wenn schon animiert
      }

      for (const { from, to } of replacements) {
        if (text.includes(from)) {
          text = text.split(from).join(to);
          node.nodeValue = text;

          // Klasse hinzufügen und nach 1 Sekunde wieder entfernen
          parent.classList.add(highlightClass, "ud-animate");
          setTimeout(() => parent.classList.remove("ud-animate"), 1000);
        }
      }
    }
  }

  // --------------------------------------------
  // 🌀 Debounce-Helfer
  // --------------------------------------------
  function debounce(fn, delay) {
    let timer = null;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  }

  // --------------------------------------------
  // 👀 Hauptlogik – DOM MutationObserver
  // --------------------------------------------
  function startObserver() {
    const table = findFleetTable();
    if (!table) {
      console.log("[Fleet DOM Replacer] Tabelle noch nicht da, warte…");
      setTimeout(startObserver, 3000);
      return;
    }

    // Initial einmal prüfen
    replaceInTextNodes(table);

    // Debounced Callback
    const debouncedReplace = debounce(() => {
      replaceInTextNodes(table);
    }, 200);

    // Observer erstellen
    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (
          m.type === "childList" ||
          m.type === "subtree" ||
          m.type === "characterData"
        ) {
          debouncedReplace();
          break;
        }
      }
    });

    // Observer starten
    observer.observe(table, {
      childList: true,
      subtree: true,
      characterData: true,
    });
  }

  // --------------------------------------------
  // 🚀 Scriptstart
  // --------------------------------------------
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startObserver);
  } else {
    startObserver();
  }
})();
