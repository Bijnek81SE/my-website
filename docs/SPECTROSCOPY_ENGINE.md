# Spectroscopy Engine

The Spectroscopy Engine is the shared simulation and teaching layer for the Organic Chemistry Hub spectroscopy lab.

## Supported techniques

- ¹H NMR with Lorentzian line shapes, integration-weighted signals, multiplicity, and J-coupling spacing.
- ¹³C NMR with distinct carbon environments and narrow broadband-decoupled signals.
- IR with broad and sharp Gaussian absorption envelopes plus a restrained fingerprint baseline.
- Mass spectrometry with normalized stick spectra, molecular-ion, base-peak, and fragment assignments.

## Architecture

`components/chemistry/spectroscopy/` contains pure data types and trace-generation functions. These functions are independent of React and are covered by unit tests.

`content/spectroscopy/` contains curated teaching datasets. Values are representative teaching simulations, not imported instrument files.

`components/spectroscopy/` contains the interactive structure viewer, spectrum plot, assignment inspector, and challenge mode.

## Structure–spectrum linking

Every assignment stores one or more atom IDs. Selecting a signal highlights its associated atom environments; selecting an atom finds a connected assignment. This shared ID model is designed to support future JCAMP-DX import, DEPT, COSY, HSQC, HMBC, and fragmentation animation.

## Scientific scope

The current spectra are realistic simulations based on curated peak positions, widths, multiplicities, and relative intensities. They are intended for undergraduate interpretation practice and are not replacements for experimental spectra or instrument-processing software.
