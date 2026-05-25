import { BookOpen, ClipboardList, FileText, LayoutDashboard, Menu, TrendingUp, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { curriculum } from "../../data/curriculum";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/projects", label: "Projects", icon: ClipboardList },
  { to: "/progress", label: "Progress", icon: TrendingUp },
  { to: "/notes", label: "Notes", icon: FileText },
];

export function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button className="mobile-menu-button" type="button" onClick={() => setOpen(true)} aria-label="Open menu">
        <Menu size={22} />
      </button>
      <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
        <div className="sidebar-header">
          <div>
            <span className="eyebrow">Learning System</span>
            <h1>AI Automation Engineer</h1>
          </div>
          <button className="icon-button mobile-only" type="button" onClick={() => setOpen(false)} aria-label="Close menu">
            <X size={18} />
          </button>
        </div>

        <nav className="primary-nav" aria-label="Main navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink key={item.to} to={item.to} onClick={() => setOpen(false)}>
                <Icon size={18} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="sidebar-parts">
          <div className="sidebar-section-title">
            <BookOpen size={16} />
            <span>Roadmap</span>
          </div>
          <div className="sidebar-part-list">
            {curriculum.length === 0 ? (
              <p className="muted small-text">Curriculum data is being prepared.</p>
            ) : (
              curriculum.map((part) => (
                <NavLink key={part.id} to={`/parts/${part.id}`} onClick={() => setOpen(false)}>
                  <span>{part.partNumber.toString().padStart(2, "0")}</span>
                  <strong>{part.title}</strong>
                </NavLink>
              ))
            )}
          </div>
        </div>
      </aside>
      {open ? <button className="sidebar-backdrop" type="button" onClick={() => setOpen(false)} aria-label="Close menu" /> : null}
    </>
  );
}
