import React from 'react';

const MethodologyModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="methodology-modal" onClick={e => e.stopPropagation()}>
        <h2>Methodology</h2>
        <div className="methodology-content">
          <p>
            I wanted to create a glanceable, up to date resource collating the latest predictions about when AGI would be developed from the people with the most access to non-public knowledge. A basic public good in the vein of <a href="https://ailabwatch.org/" target="_blank" rel="noopener noreferrer">ailabwatch.org</a>, to make it easy to see what insiders were saying at a glance, and how the predictions were trending.
          </p>
          
          <p>
            Several AGI timeline prediction tracker sites exist, including the excellent work of AI Digest <a href="https://theaidigest.org/timeline" target="_blank" rel="noopener noreferrer">theaidigest.org/timeline</a> and AIMultiple <a href="https://research.aimultiple.com/artificial-general-intelligence-singularity-timing/#why-do-some-experts-believe-that-we-will-not-reach-agi" target="_blank" rel="noopener noreferrer">research.aimultiple.com</a>, but I haven't found any which focus on the forecasts of insiders and directly tackle the question of how AGI is defined for a given prediction.
          </p>
          
          <p>
            Defining AGI is tricky, and in some cases, even what a given AI insider uses as a working definition has shifted over time. This does make combining the predictions into a median problematic. I nevertheless chose to include it because even the less ambitious definitions imply significant impacts to how humans live and work, and having some sense of when experts anticipate that happening is useful <a href="https://en.wikipedia.org/wiki/All_models_are_wrong" target="_blank" rel="noopener noreferrer">en.wikipedia.org/wiki/All_models_are_wrong</a>.
          </p>
          
          <p>
            We should also take the predictions of these experts with a grain of salt; every expert I included has some level of incentive to message that powerful AI is right around the corner (e.g., further internal and external investment dollars, personal and corporate influence).
          </p>
          
          <p>
            I included Metaculus to both provide a counterbalance and to provide a more concrete and stable definition of AGI than any of the experts. The Metaculus target is perhaps too high, in that significant disruption to work and human-AI dynamics would likely occur at a lower level of capabilities.
          </p>
          
          <p>
            Many instances of these experts sharing AGI predictions lack adequate definition of what AGI means to them at that time, especially interviews. Those instances have been omitted except where other context in the source gives enough definition to work with.
          </p>
        </div>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default MethodologyModal;
