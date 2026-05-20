![ZScope Banner](https://raw.githubusercontent.com/Tecush/ZScope/main/images/splash.png)

<div align="center">
  <img width="50" height="50" alt="ZScope Icon" src="https://github.com/user-attachments/assets/c23f0756-3dc3-46ac-a2b2-4c69e630ff50" />
  <h1>ZScope</h1>
  <p><strong>Publication-Grade Electrochemical Impedance Spectroscopy (EIS) Analysis Platform</strong></p>
  
  <p>
    <a href="#-features">Features</a> •
    <a href="#-applications">Applications</a> •
    <a href="#-installation">Installation</a> •
    <a href="#-citation">Citation</a> •
    <a href="#-contact">Contact</a>
  </p>

  <p>
    <a href="https://github.com/Tecush/ZScope/releases/latest"><img src="https://img.shields.io/github/v/release/Tecush/ZScope?label=Release&color=blue" alt="Release"/></a>
    <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-green" alt="License"/></a>
    <a href="https://github.com/Tecush/ZScope/issues"><img src="https://img.shields.io/github/issues/Tecush/ZScope" alt="Issues"/></a>
  </p>
</div>

---

## 📋 Table of Contents
- [✨ Overview](#-overview)
- [🚀 Core Capabilities](#-core-capabilities)
- [🔬 Scientific Applications](#-scientific-applications)
- [💡 Why ZScope?](#-why-zscope)
- [🧪 Example: Impedance Modeling](#-example-impedance-modeling)
- [📦 Installation](#-installation)
- [📚 Citation](#-citation)
- [📬 Contact](#-contact)

---

## ✨ Overview

**ZScope** is a modern scientific platform designed for advanced Electrochemical Impedance Spectroscopy (EIS) analysis in both academic and industrial research environments.

The software combines:
- 🔬 Physically rigorous impedance modeling
- ⚙️ Advanced optimization algorithms  
- 📊 Bayesian uncertainty quantification
- ✅ Kramers–Kronig validation
- 🎨 Interactive circuit simulation

—all within a unified, high-performance interface.

> 💡 **Philosophy**: Instead of functioning as a black-box fitting tool, ZScope emphasizes **reproducibility**, **statistical rigor**, and **physically meaningful interpretation** of electrochemical systems.

### 🔍 Ideal For Researchers Working In:
| Domain | Examples |
|--------|----------|
| 🔋 Energy Storage | Li-ion, Na-ion, solid-state batteries |
| ☀️ Photovoltaics | Perovskite solar cells, DSSCs |
| ⚡ Electrochemistry | Fuel cells, electrolyzers, supercapacitors |
| 🛡️ Materials Science | Corrosion, coatings, biosensors |
| 🧪 Fundamental Research | Charge transfer, diffusion, interfacial kinetics |

---

## 🚀 Core Capabilities

### 🧩 Interactive Circuit Modeling
Visual drag-and-drop circuit editor designed specifically for EIS workflows:
- ✅ Real-time Nyquist & Bode plot updates
- ✅ Support for standard & advanced elements:  R, C, L, CPE, Warburg (W), Gerischer, 
  Transmission-line, Bisquert structures, custom composites
- ✅ Support for user custom component design
- ✅ Automatic conversion: graphical topology → netlist → mathematical model

### ⚙️ Advanced Fitting Engine
Reliable parameter extraction from noisy or complex spectra:
- Trust-Region Reflective (TRF) algorithm
- Latin Hypercube multi-start initialization  
- Robust soft_l1 loss functions
- Adaptive parameter bounds & frequency sub-band fitting
- AIC/BIC model comparison
- Residual diagnostics & sensitivity analysis

### 📊 Bayesian Uncertainty Quantification
Go beyond point estimates with full probabilistic inference:
- 📈 Posterior distributions & 95% credible intervals
- 🔮 Predictive uncertainty bands
- 🔍 Convergence diagnostics & autocorrelation analysis
- 🔗 Parameter correlation matrices

### ✅ Kramers–Kronig Validation
Ensure physical consistency *before* fitting:
- ✓ Detect non-stationary systems
- ✓ Identify unstable measurements  
- ✓ Flag non-linear responses
- ✓ Validate frequency-range consistency

### ⚡ High-Performance Backend
Fully vectorized numerical core for responsive interaction:
- 🔄 Real-time simulation updates during circuit editing
- 📉 Rapid iterative fitting with large frequency sweeps
- 🎯 Near-instant Nyquist/Bode rendering

### 📈 Scientific Visualization & Reporting
Publication-ready outputs:
- Nyquist, Bode magnitude & phase plots
- Residual diagnostics & parameter sensitivity charts
- Posterior distributions & uncertainty bands
- Exportable tables & reproducible fit reports (PNG, PDF, SVG)

---

## 🔬 Scientific Applications

<details>
<summary>🔋 Battery Research</summary>
Analyze charge-transfer resistance, SEI formation, diffusion behavior, degradation mechanisms, and transport limitations in Li-ion, Na-ion, and solid-state systems.
</details>

<details>
<summary>☀️ Perovskite Solar Cells</summary>
Investigate recombination dynamics, ionic transport, interfacial charge accumulation, capacitance behavior, and frequency-dependent interfacial processes.
</details>

<details>
<summary>🛡️ Corrosion Science</summary>
Characterize polarization resistance, coating integrity, diffusion-controlled kinetics, and electrochemical degradation mechanisms.
</details>

<details>
<summary>⚡ Fuel Cells & Electrolyzers</summary>
Study catalytic activity, electrode interfaces, charge-transfer processes, and mass transport limitations.
</details>

<details>
<summary>🔌 Supercapacitors & Energy Storage</summary>
Evaluate porous electrode behavior, double-layer capacitance, diffusion impedance, and frequency-dependent energy-storage mechanisms.
</details>

---

## 💡 Why ZScope?

| Traditional EIS Software | ZScope |
|--------------------------|--------|
| ⚫ Black-box fitting procedures | 🔍 Transparent, documented methodology |
| ❓ Limited uncertainty interpretation | 📊 Full Bayesian uncertainty quantification |
| 🧱 Static, linear workflows | 🎮 Interactive real-time modeling |
| 📉 Minimal diagnostics | 🩺 Comprehensive residual & sensitivity analysis |
| 🎲 Physically ambiguous results | ✅ Validation-aware, physically constrained fitting |
| 💰 Enterprise licensing | 🎓 Academic-friendly, open accessibility |

---

## 🧪 Example: Impedance Modeling

Electrochemical systems rarely behave as ideal electrical circuits. Real interfaces often exhibit distributed capacitance, surface heterogeneity, ionic diffusion, adsorption processes, and non-ideal charge-transfer behavior.

### Modified Randles Circuit
A foundational model for EIS analysis:

| Component | Symbol | Physical Meaning |
|-----------|--------|-----------------|
| Solution resistance | `Rₛ` | Uncompensated electrolyte resistance |
| Charge-transfer resistance | `Rₜₕ` | Interfacial charge-transfer kinetics |
| Constant Phase Element | `CPE: Q(jω)ⁿ` | Non-ideal double-layer capacitance |
| Warburg element | `Z_W(ω)` | Diffusion-controlled impedance |

#### Impedance Equation
$$Z(\omega) = R_s + \left[ \frac{1}{R_{ct}} + Q(j\omega)^n + \frac{1}{Z_W(\omega)} \right]^{-1}$$

> 💡 **Why CPE instead of ideal capacitance?**  
> Surface roughness, porosity, grain boundaries, non-uniform current distribution, and interfacial heterogeneity often produce *depressed semicircles* in Nyquist plots. The CPE formalism (`Q(jω)ⁿ`) captures this non-ideal behavior more realistically than a pure capacitor.

### Advanced Model Support
ZScope extends beyond classical circuits:
- Transmission-line models
- Gerischer impedance
- Porous electrode models
- Bisquert diffusion structures  
- Distributed RC networks
- Custom composite circuits

### Visualization Workflow
Build circuits interactively while viewing synchronized outputs:
- ✓ Nyquist response
- ✓ Bode magnitude & phase
- ✓ Residual structure
- ✓ Parameter sensitivity
- ✓ Uncertainty propagation

---

## 📦 Installation

### 📥 Download Release
Latest pre-compiled binaries for Windows, macOS, and Linux:
🔗 [github.com/Tecush/ZScope/releases/latest](https://github.com/Tecush/ZScope/releases/latest)

### 🛠️ Build from Source (Advanced)
git clone https://github.com/Tecush/ZScope.git
cd ZScope

📚 Citation
If you use ZScope in your research, please cite:

@software{zscope2026,
  author  = {Mohammadi, Tecush},
  title   = {ZScope: Publication-Grade Electrochemical Impedance Spectroscopy Platform},
  year    = {2026},
  url     = {https://github.com/Tecush/ZScope}
}

📬 Contact
Role
	
Details
👨‍💻 Developer
	
Tecush Mohammadi
🐙 GitHub
	
@Tecush
📁 Repository
	
ZScope
✉️ Email
	
tecush@gmail.com
<div align="center">
  <sub>Built for the electrochemical research community</sub>
</div>
