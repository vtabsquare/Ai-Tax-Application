import React from 'react';
import { Sparkles, TrendingDown, Download, ChevronRight, AlertCircle, Zap, ShieldCheck, BarChart3, FileText, Briefcase, Landmark } from 'lucide-react';

const TaxDashboard = ({ data }) => {
  const { oldTax, newTax, betterRegime, savings, recommendations } = data;

  return (
    <div className="animate-up">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem' }}>
        <div>
          <h1 className="hero-title" style={{ textAlign: 'left', marginBottom: '0.25rem' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', fontWeight: 800 }}>Executive </span>
            <span className="gradient-span" style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', fontWeight: 800 }}>Intelligence</span>
          </h1>
          <p style={{ color: '#555', fontSize: '1rem', fontWeight: 500 }}>Financial Synthesis Report • FY 2024-25</p>
        </div>
        <button className="btn-v5" style={{ background: '#050505', border: '1px solid #111', color: '#888', borderRadius: '12px', padding: '0.6rem 1.5rem', fontSize: '0.75rem', width: 'auto' }}>
          <FileText size={16} /> EXPORT PDF
        </button>
      </div>

      <div className="dashboard-v5">
        <div className="card-v5">
          <div className="card-header-v5">
            <span style={{ fontSize: '0.6rem', fontWeight: 900, color: '#333', letterSpacing: '0.12em' }}>INSTITUTIONAL REGIME</span>
          </div>
          <div className="val-v5">
            <span style={{ fontSize: '1.25rem', color: '#333', marginRight: '0.35rem' }}>₹</span>
            {oldTax.toLocaleString()}
          </div>
          <p style={{ color: '#333', marginTop: '1.5rem', fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>STANDARD DEDUCTIONS APPLIED</p>
        </div>

        <div className="card-v5 active-red">
          <div className="card-header-v5">
            <span style={{ fontSize: '0.6rem', fontWeight: 900, color: '#FF004D', letterSpacing: '0.12em' }}>ADVANCED REGIME</span>
            <div className="badge-v5 badge-red" style={{ fontSize: '0.55rem', padding: '0.3rem 0.75rem' }}>
              <Zap size={8} fill="#FF004D" /> OPTIMIZED
            </div>
          </div>
          <div className="val-v5">
            <span style={{ fontSize: '1.25rem', color: '#FF004D', marginRight: '0.35rem' }}>₹</span>
            {newTax.toLocaleString()}
          </div>
          <p style={{ color: '#FF004D', marginTop: '1.5rem', fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>STREAMLINED COMPLIANCE PATH</p>
        </div>

        <div className="card-v5" style={{ background: 'linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 100%)', border: '1px solid #222' }}>
          <div className="card-header-v5">
            <div style={{ background: 'rgba(255, 0, 77, 0.1)', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <TrendingDown size={16} color="#FF004D" />
            </div>
            <span style={{ fontSize: '0.6rem', fontWeight: 900, color: '#FFFFFF', letterSpacing: '0.12em' }}>NET RETENTION</span>
          </div>
          <div className="val-v5" style={{ color: 'white' }}>
            <span style={{ fontSize: '1.25rem', opacity: 0.3, marginRight: '0.35rem' }}>₹</span>
            {savings.toLocaleString()}
          </div>
          <p style={{ color: '#555', marginTop: '1.5rem', fontSize: '0.65rem', fontWeight: 600 }}>
            SUPERIOR LIQUIDITY STRATEGY
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2.5rem' }}>
        <Briefcase size={18} style={{ color: '#FF004D' }} />
        <h2 style={{ fontSize: '0.8rem', fontWeight: 900, color: '#555', textTransform: 'uppercase', letterSpacing: '0.15em' }}>ASSET ALLOCATION STRATEGY</h2>
      </div>

      <div className="strategy-grid-v5">
        {recommendations.map(rec => (
          <div key={rec.id} className="rec-card-v5">
            <div className="rec-icon-v5">
              <Sparkles size={24} />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: 600, fontSize: '1rem', lineHeight: 1.4, marginBottom: '0.4rem' }}>{rec.suggestion}</p>
              <div className="retention-pill" style={{ fontSize: '0.65rem' }}>
                RETENTION: ₹ {rec.estimatedSaving.toLocaleString()}
              </div>
            </div>
            <ChevronRight size={20} style={{ color: '#111' }} />
          </div>
        ))}
      </div>

      <div style={{ marginTop: '5rem', background: '#050505', padding: '2.5rem', borderRadius: '1.5rem', border: '1px dotted #222', display: 'flex', gap: '1.5rem', color: '#333' }}>
        <AlertCircle size={28} style={{ flexShrink: 0 }} />
        <div>
          <p style={{ fontSize: '0.65rem', fontWeight: 900, letterSpacing: '0.12em', marginBottom: '0.75rem', color: '#555' }}>INTELLIGENCE DISCLAIMER</p>
          <p style={{ fontSize: '0.9rem', fontWeight: 500, lineHeight: 1.6 }}>
            This synthesis is generated by the TaxAI Neural Engine for strategic planning. While high-precision, it is not a substitute for certified audit counsel. Please consult an authorized financial strategist for final execution.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TaxDashboard;
