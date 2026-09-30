import { useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Link, Navigate, Route, Routes, NavLink } from 'react-router-dom';
import {
	ArrowRight,
	BookOpen,
	CalendarDays,
	Check,
	CheckCheck,
	ChevronDown,
	ChevronLeft,
	ChevronRight,
	Circle,
	Clock3,
	GraduationCap,
	LayoutDashboard,
	Menu,
	MoreHorizontal,
	NotebookPen,
	Pencil,
	Plus,
	Search,
	Settings2,
	Sparkles,
	Trash2,
	X,
} from 'lucide-react';

import './styles.css'

const TASKS_KEY = 'daymark-tasks';
const NOTES_KEY = 'daymark-notes';
const readStored = (key, fallback) => {
	try {
		const value = localStorage.getItem(key);
		return value ? JSON.parse(value) : fallback;
	} catch {
		return fallback;
	}
};
const dateKey = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
const todayKey = () => dateKey(new Date());
const displayDate = (value, options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }) => new Date(`${value}T12:00:00`).toLocaleDateString('en-US', options);
const prettyTime = (value) => value ? new Date(`2000-01-01T${value}`).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }) : '';

function Apps() {
	const [user] = useState({ name: 'Student', email: 'Stored in this browser' });
	const [tasks, setTasks] = useState(() => readStored(TASKS_KEY, []));
	const [notes, setNotes] = useState(() => readStored(NOTES_KEY, {}));
	const [modal, setModal] = useState(null);

	useEffect(() => { localStorage.setItem(TASKS_KEY, JSON.stringify(tasks)); }, [tasks]);
	useEffect(() => { localStorage.setItem(NOTES_KEY, JSON.stringify(notes)); }, [notes]);

	const saveTask = (task) => {
		setTasks((current) => task.id
			? current.map((item) => item.id === task.id ? { ...item, ...task } : item)
			: [{ ...task, id: globalThis.crypto?.randomUUID?.() || String(Date.now()), position: current.length }, ...current]);
		setModal(null);
	};

	const updateTask = (id, updates) => {
		setTasks((current) => current.map((task) => task.id === id ? { ...task, ...updates } : task));
	};

	const deleteTask = (id) => {
		setTasks((current) => current.filter((task) => task.id !== id));
	};

	const saveNote = (date, content) => {
		setNotes((current) => ({ ...current, [date]: content }));
	};

	const reorder = (_date, orderedIds) => {
		const positions = new Map(orderedIds.map((id, index) => [id, index]));
		setTasks((current) => current.map((task) => positions.has(task.id) ? { ...task, position: positions.get(task.id) } : task));
	};

	return (
		<BrowserRouter>
			<div className="app-frame">
				<Sidebar user={user} />
				<main className="main-area">
					<Routes>
							<Route path="/" element={<Dashboard user={user} tasks={tasks} loading={false} onAdd={() => setModal({})} onEdit={(task) => setModal(task)} onUpdate={updateTask} onDelete={deleteTask} />} />
							<Route path="/diary" element={<Diary tasks={tasks} notes={notes} onSaveNote={saveNote} onAdd={(date) => setModal({ date })} onEdit={(task) => setModal(task)} onUpdate={updateTask} onDelete={deleteTask} onReorder={reorder} />} />
							<Route path="/week" element={<WeekView tasks={tasks} onAdd={(date) => setModal({ date })} onEdit={(task) => setModal(task)} />} />
							<Route path="/tasks" element={<TaskList title="All tasks" tasks={tasks.filter((task) => task.status !== 'Completed')} onAdd={() => setModal({})} onEdit={(task) => setModal(task)} onUpdate={updateTask} onDelete={deleteTask} />} />
							<Route path="/completed" element={<TaskList title="Completed tasks" tasks={tasks.filter((task) => task.status === 'Completed')} onAdd={() => setModal({})} onEdit={(task) => setModal(task)} onUpdate={updateTask} onDelete={deleteTask} />} />
							  <Route path="/calendar" element={<CalendarView tasks={tasks} onAdd={(date) => setModal({ date })} onEdit={(task) => setModal(task)} onUpdate={updateTask} onDelete={deleteTask} />} />
							<Route path="/settings" element={<Settings user={user} />} />
							<Route path="*" element={<Navigate to="/" replace />} />
					</Routes>
				</main>
				{modal && <TaskModal task={modal.id ? modal : null} initialDate={modal.date} onSave={saveTask} onClose={() => setModal(null)} />}
			</div>
		</BrowserRouter>
	);
}

const navigation = [
	{ label: 'Your space', items: [
		{ to: '/', label: 'Dashboard', Icon: LayoutDashboard },
		{ to: '/diary', label: 'Daily diary', Icon: NotebookPen },
		{ to: '/week', label: 'Weekly view', Icon: CalendarDays },
	] },
	{ label: 'Keep track', items: [
		{ to: '/tasks', label: 'All tasks', Icon: Circle },
		{ to: '/completed', label: 'Completed', Icon: CheckCheck },
		{ to: '/calendar', label: 'Calendar', Icon: BookOpen },
	] },
];

function Sidebar({ user }) {
	const [open, setOpen] = useState(false);
	return <>
		<button className="mobile-menu" onClick={() => setOpen(!open)} aria-label="Toggle navigation">{open ? <X /> : <Menu />}</button>
		{open && <button className="sidebar-scrim" onClick={() => setOpen(false)} aria-label="Close navigation" />}
		<aside className={`sidebar ${open ? 'sidebar-open' : ''}`}>
			<NavLink to="/" className="brand" onClick={() => setOpen(false)}><span className="brand-mark"><GraduationCap size={20} /></span><span>daymark</span><span className="brand-dot" /></NavLink>
			<div className="nav-groups">{navigation.map((group) => <div className="nav-group" key={group.label}><span className="nav-label">{group.label}</span>{group.items.map(({ to, label, Icon }) => <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => `nav-link ${isActive ? 'nav-active' : ''}`} onClick={() => setOpen(false)}><Icon size={18} strokeWidth={1.8} /><span>{label}</span></NavLink>)}</div>)}</div>
			<div className="sidebar-bottom"><div className="term-card"><div className="term-icon"><Sparkles size={17} /></div><div><strong>One day at a time</strong><span>Your progress counts.</span></div></div><NavLink to="/settings" className={({ isActive }) => `nav-link settings-link ${isActive ? 'nav-active' : ''}`} onClick={() => setOpen(false)}><Settings2 size={18} /><span>Settings</span></NavLink><div className="profile-row"><span className="avatar">{user.name.slice(0, 1).toUpperCase()}</span><div className="profile-copy"><strong>{user.name}</strong><small>Saved on this device</small></div></div></div>
		</aside>
	</>;
}

function PageHeading({ eyebrow, title, subtitle, action }) {
	return <div className="page-heading"><div><span className="eyebrow">{eyebrow}</span><h1>{title}</h1>{subtitle && <p>{subtitle}</p>}</div>{action}</div>;
}

function Dashboard({ user, tasks, loading, onAdd, onEdit, onUpdate, onDelete }) {
	const today = todayKey();
	const todaysTasks = tasks.filter((task) => task.date === today);
	const completed = todaysTasks.filter((task) => task.status === 'Completed').length;
	const pending = todaysTasks.filter((task) => task.status === 'Pending').length;
	const inProgress = todaysTasks.filter((task) => task.status === 'In Progress').length;
	const percent = todaysTasks.length ? Math.round((completed / todaysTasks.length) * 100) : 0;
	const weekStart = new Date(); weekStart.setDate(weekStart.getDate() - ((weekStart.getDay() + 6) % 7));
	const weekEnd = new Date(weekStart); weekEnd.setDate(weekStart.getDate() + 6);
	const weekly = tasks.filter((task) => task.date >= dateKey(weekStart) && task.date <= dateKey(weekEnd));
	const weekPercent = weekly.length ? Math.round((weekly.filter((task) => task.status === 'Completed').length / weekly.length) * 100) : 0;
	const cards = [
		{ label: "Today's tasks", value: todaysTasks.length, Icon: NotebookPen, tint: 'mint' },
		{ label: 'Completed', value: completed, Icon: Check, tint: 'yellow' },
		{ label: 'Still to do', value: pending, Icon: Circle, tint: 'coral' },
		{ label: 'In progress', value: inProgress, Icon: Clock3, tint: 'blue' },
	];
	return <div className="page dashboard-page">
		<PageHeading eyebrow={displayDate(today, { month: 'long', day: 'numeric', year: 'numeric' })} title={`Good morning, ${user.name.split(' ')[0]}.`} subtitle="Small progress every day leads to big results." action={<button className="primary-button add-button" onClick={onAdd}><Plus size={18} />Add task</button>} />
		<div className="summary-grid">{cards.map(({ label, value, Icon, tint }, index) => <div className={`summary-card summary-${tint}`} style={{ '--enter': `${index * 65}ms` }} key={label}><div className="summary-top"><span>{label}</span><span className="summary-icon"><Icon size={18} /></span></div><strong>{value}</strong><span className="summary-foot">{label === 'Still to do' ? 'Ready when you are' : label === 'In progress' ? 'Keep the momentum' : 'A step forward'}</span></div>)}<div className="summary-card summary-week"><div className="summary-top"><span>This week</span><span className="summary-icon"><CalendarDays size={18} /></span></div><strong>{weekPercent}<small>%</small></strong><div className="mini-track"><span style={{ width: `${weekPercent}%` }} /></div><span className="summary-foot">Weekly completion</span></div></div>
		<div className="dashboard-grid"><section className="progress-panel"><div className="section-heading"><div><span className="eyebrow">YOUR DAY, IN MOTION</span><h2>Today's progress</h2></div><span className="date-chip"><CalendarDays size={14} />{displayDate(today, { month: 'short', day: 'numeric' })}</span></div><div className="progress-number"><strong>{percent}<small>%</small></strong><span>{completed} of {todaysTasks.length} tasks done</span></div><div className="progress-track"><span style={{ width: `${percent}%` }} /></div><div className="progress-legend"><span><i className="legend-dot done-dot" />{completed} completed</span><span><i className="legend-dot pending-dot" />{pending} pending</span><span><i className="legend-dot active-dot" />{inProgress} in progress</span></div><div className="progress-quote"><span className="quote-mark">“</span><p>Showing up is its own kind of progress.</p><span>YOUR DAILY REMINDER</span></div></section>
			<section className="today-panel"><div className="section-heading"><div><span className="eyebrow">THE NEXT RIGHT THING</span><h2>Today's tasks</h2></div><Link to="/diary" className="text-link">Open diary <ArrowRight size={15} /></Link></div><div className="task-list">{todaysTasks.length ? sortTasks(todaysTasks).map((task) => <TaskRow key={task.id} task={task} onEdit={onEdit} onUpdate={onUpdate} onDelete={onDelete} />) : <EmptyState title="A little breathing room" detail="Add something you want to make time for today." />}</div>{loading && <p className="loading-line">Refreshing your day…</p>}<button className="add-inline" onClick={onAdd}><Plus size={17} />Add a task for today</button></section></div>
	</div>;
}

function sortTasks(items) { return [...items].sort((a, b) => (a.startTime || a.dueTime || '99:99').localeCompare(b.startTime || b.dueTime || '99:99') || a.position - b.position); }

function TaskRow({ task, onEdit, onUpdate, onDelete, draggable = false, onDragStart, onDrop }) {
	const [menu, setMenu] = useState(false);
	const done = task.status === 'Completed';
	const due = task.dueTime ? `Due ${prettyTime(task.dueTime)}` : task.startTime ? prettyTime(task.startTime) : 'Anytime';
	return <div className={`task-row ${done ? 'task-done' : ''}`} draggable={draggable} onDragStart={onDragStart} onDragOver={(event) => draggable && event.preventDefault()} onDrop={onDrop}>
		<button className={`task-check ${done ? 'checked' : ''}`} onClick={() => onUpdate(task.id, { status: done ? 'Pending' : 'Completed' })} aria-label={done ? 'Mark task incomplete' : 'Complete task'}>{done && <Check size={13} />}</button>
		<div className="task-main"><div className="task-title-line"><strong>{task.title}</strong><span className={`priority-dot priority-${task.priority.toLowerCase()}`} title={`${task.priority} priority`} /></div><div className="task-meta"><span>{task.subject || task.type}</span><i />{task.subject && <><span>{task.type}</span><i /></>}<span><Clock3 size={12} />{due}</span></div></div>
		<span className={`status-pill status-${task.status.toLowerCase().replace(' ', '-')}`}>{task.status}</span>
		<div className="row-actions"><button className="icon-button" onClick={() => onEdit(task)} aria-label={`Edit ${task.title}`} title="Edit"><Pencil size={15} /></button><div className="menu-wrap"><button className="icon-button" onClick={() => setMenu(!menu)} aria-label="Task actions" title="More"><MoreHorizontal size={17} /></button>{menu && <div className="mini-menu"><button onClick={() => { onEdit(task); setMenu(false); }}><Pencil size={14} />Edit task</button><button className="danger-action" onClick={() => { onDelete(task.id); setMenu(false); }}><Trash2 size={14} />Delete task</button></div>}</div></div>
	</div>;
}

function EmptyState({ title, detail }) { return <div className="empty-state"><div className="empty-icon"><Sparkles size={19} /></div><strong>{title}</strong><span>{detail}</span></div>; }

const diarySections = [
	{ title: 'Morning', range: [5, 11], hint: 'A gentle start to the day' },
	{ title: 'School / college', range: [11, 15], hint: 'Classes, study, and campus time' },
	{ title: 'Afternoon', range: [15, 18], hint: 'Pick up where the day left off' },
	{ title: 'Evening', range: [18, 22], hint: 'Make space for focused work' },
	{ title: 'Night', range: [22, 29], hint: 'Close the day, prepare for tomorrow' },
];
const taskHour = (task) => Number((task.startTime || task.dueTime || '12:00').split(':')[0]);

function Diary({ tasks, notes, onSaveNote, onAdd, onEdit, onUpdate, onDelete, onReorder }) {
	const [selected, setSelected] = useState(todayKey());
	const [dragged, setDragged] = useState(null);
	const [noteDrafts, setNoteDrafts] = useState({});
	const [noteSaved, setNoteSaved] = useState(false);
	const [noteError, setNoteError] = useState('');
	const noteDraft = noteDrafts[selected] ?? notes[selected] ?? '';
	const setNoteDraft = (content) => setNoteDrafts((current) => ({ ...current, [selected]: content }));
	const dayTasks = useMemo(() => tasks.filter((task) => task.date === selected).sort((a, b) => a.position - b.position), [tasks, selected]);
	const moveDate = (amount) => { const next = new Date(`${selected}T12:00:00`); next.setDate(next.getDate() + amount); setSelected(dateKey(next)); };
	const persistNote = async () => {
		setNoteError('');
		try { await onSaveNote(selected, noteDraft); setNoteSaved(true); window.setTimeout(() => setNoteSaved(false), 1700); }
		catch (err) { setNoteError(err.message); }
	};
	const reorderWithinDay = (targetId) => {
		if (!dragged || dragged === targetId) return;
		const ids = dayTasks.map((task) => task.id);
		const from = ids.indexOf(dragged); const to = ids.indexOf(targetId);
		ids.splice(to, 0, ids.splice(from, 1)[0]); onReorder(selected, ids); setDragged(null);
	};
	return <div className="page diary-page">
		<PageHeading eyebrow="A little space to reflect" title="Daily diary" subtitle="Shape the day you want to have." action={<button className="primary-button add-button" onClick={() => onAdd(selected)}><Plus size={18} />Add task</button>} />
		<div className="day-switcher"><button className="icon-button" onClick={() => moveDate(-1)} aria-label="Previous day"><ChevronLeft size={19} /></button><div><CalendarDays size={17} /><strong>{displayDate(selected)}</strong>{selected === todayKey() && <span className="today-tag">Today</span>}</div><button className="icon-button" onClick={() => moveDate(1)} aria-label="Next day"><ChevronRight size={19} /></button><button className="today-button" onClick={() => setSelected(todayKey())}>Today</button></div>
		<div className="diary-layout"><div className="timeline">{diarySections.map((section) => { const sectionTasks = dayTasks.filter((task) => { const hour = taskHour(task); return section.title === 'Night' ? hour >= 22 || hour < 5 : hour >= section.range[0] && hour < section.range[1]; }); return <section className="timeline-section" key={section.title}><div className="timeline-marker"><span /></div><div className="timeline-content"><div className="timeline-heading"><div><h2>{section.title}</h2><span>{section.hint}</span></div><button className="icon-button add-small" onClick={() => onAdd(selected)} aria-label={`Add task to ${section.title}`}><Plus size={17} /></button></div>{sectionTasks.length ? <div className="timeline-tasks">{sectionTasks.map((task) => <TaskRow key={task.id} task={task} onEdit={onEdit} onUpdate={onUpdate} onDelete={onDelete} draggable onDragStart={() => setDragged(task.id)} onDrop={() => reorderWithinDay(task.id)} />)}</div> : <div className="timeline-empty">No plans here yet <button onClick={() => onAdd(selected)}>Add one</button></div>}</div></section>; })}</div>
			<aside className="notes-panel"><div className="notes-title"><span className="notes-icon"><NotebookPen size={17} /></span><div><span className="eyebrow">A NOTE TO YOURSELF</span><h2>Today's notes</h2></div></div><textarea value={noteDraft} onChange={(event) => setNoteDraft(event.target.value)} placeholder="What is on your mind today? Jot down a thought, a small win, or something to remember…" maxLength={5000} /><div className="notes-footer"><span>{noteError || `${noteDraft.length} / 5000`}</span><button className="text-link" onClick={persistNote}>{noteSaved ? <><Check size={15} />Saved</> : 'Save note'}</button></div><div className="note-prompt"><Sparkles size={15} /><span>What felt good about today?</span></div></aside></div>
	</div>;
}

function WeekView({ tasks, onAdd, onEdit }) {
	const [weekOffset, setWeekOffset] = useState(0);
	const start = new Date(); start.setDate(start.getDate() - ((start.getDay() + 6) % 7) + weekOffset * 7); start.setHours(12, 0, 0, 0);
	const days = Array.from({ length: 7 }, (_, index) => { const date = new Date(start); date.setDate(start.getDate() + index); return date; });
	return <div className="page"><PageHeading eyebrow="See the shape of your week" title="Weekly view" subtitle="A little perspective, seven days at a time." action={<div className="week-controls"><button className="icon-button" onClick={() => setWeekOffset(weekOffset - 1)} aria-label="Previous week"><ChevronLeft /></button><button className="today-button" onClick={() => setWeekOffset(0)}>This week</button><button className="icon-button" onClick={() => setWeekOffset(weekOffset + 1)} aria-label="Next week"><ChevronRight /></button></div>} /><div className="week-range">{displayDate(dateKey(days[0]), { month: 'long', day: 'numeric' })} – {displayDate(dateKey(days[6]), { month: 'long', day: 'numeric', year: 'numeric' })}</div><div className="week-grid">{days.map((day) => { const key = dateKey(day); const dayTasks = sortTasks(tasks.filter((task) => task.date === key)); return <section className={`week-column ${key === todayKey() ? 'week-today' : ''}`} key={key}><header><span>{day.toLocaleDateString('en-US', { weekday: 'short' })}</span><strong>{day.getDate()}</strong></header><div className="week-items">{dayTasks.map((task) => <button className={`week-task week-${task.priority.toLowerCase()} ${task.status === 'Completed' ? 'week-task-done' : ''}`} key={task.id} onClick={() => onEdit(task)}><span>{task.startTime ? prettyTime(task.startTime) : task.dueTime ? prettyTime(task.dueTime) : 'Anytime'}</span><strong>{task.title}</strong></button>)}{!dayTasks.length && <span className="week-free">Open day</span>}</div><button className="week-add" onClick={() => onAdd(key)} aria-label={`Add task for ${key}`}><Plus size={15} /></button></section>; })}</div></div>;
}

function TaskList({ title, tasks, onAdd, onEdit, onUpdate, onDelete }) {
	const [query, setQuery] = useState('');
	const [filter, setFilter] = useState('All');
	const filtered = tasks.filter((task) => `${task.title} ${task.subject} ${task.type}`.toLowerCase().includes(query.toLowerCase()) && (filter === 'All' || task.priority === filter)).sort((a, b) => a.date.localeCompare(b.date) || (a.startTime || a.dueTime || '99:99').localeCompare(b.startTime || b.dueTime || '99:99') || a.position - b.position);
	return <div className="page"><PageHeading eyebrow="Everything in one place" title={title} subtitle={`${tasks.length} ${tasks.length === 1 ? 'task' : 'tasks'} to keep track of.`} action={<button className="primary-button add-button" onClick={onAdd}><Plus size={18} />Add task</button>} /><div className="list-toolbar"><label className="search-field"><Search size={16} /><input placeholder="Search tasks" value={query} onChange={(event) => setQuery(event.target.value)} /></label><label className="filter-field"><span>Priority</span><select value={filter} onChange={(event) => setFilter(event.target.value)}><option>All</option><option>High</option><option>Medium</option><option>Low</option></select><ChevronDown size={14} /></label></div><div className="all-task-list">{filtered.length ? filtered.map((task) => <div className="dated-task" key={task.id}><div className="dated-label"><span>{displayDate(task.date, { weekday: 'short' })}</span><strong>{displayDate(task.date, { month: 'short', day: 'numeric' })}</strong></div><TaskRow task={task} onEdit={onEdit} onUpdate={onUpdate} onDelete={onDelete} /></div>) : <EmptyState title="No tasks found" detail={query ? 'Try a different search.' : 'Make a little plan for the days ahead.'} />}</div></div>;
}

function CalendarView({ tasks, onAdd, onEdit, onUpdate, onDelete }) {
	const [month, setMonth] = useState(() => new Date(new Date().getFullYear(), new Date().getMonth(), 1));
	const [selected, setSelected] = useState(todayKey());
	const first = new Date(month.getFullYear(), month.getMonth(), 1);
	const start = new Date(first); start.setDate(1 - ((first.getDay() + 6) % 7));
	const cells = Array.from({ length: 42 }, (_, index) => { const date = new Date(start); date.setDate(start.getDate() + index); return date; });
	const selectedTasks = sortTasks(tasks.filter((task) => task.date === selected));
	return <div className="page"><PageHeading eyebrow="Your time, at a glance" title="Calendar" subtitle="Notice the rhythm of your plans." action={<button className="primary-button add-button" onClick={() => onAdd(selected)}><Plus size={18} />Add task</button>} /><div className="calendar-layout"><section className="calendar-panel"><div className="calendar-head"><div><span className="eyebrow">MONTHLY VIEW</span><h2>{month.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h2></div><div className="calendar-controls"><button className="icon-button" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))} aria-label="Previous month"><ChevronLeft /></button><button className="icon-button" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))} aria-label="Next month"><ChevronRight /></button></div></div><div className="calendar-grid calendar-weekdays">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => <span key={day}>{day}</span>)}</div><div className="calendar-grid">{cells.map((day) => { const key = dateKey(day); const count = tasks.filter((task) => task.date === key && task.status !== 'Completed').length; return <button key={key} className={`calendar-cell ${day.getMonth() !== month.getMonth() ? 'outside-month' : ''} ${key === selected ? 'calendar-selected' : ''} ${key === todayKey() ? 'calendar-today' : ''}`} onClick={() => setSelected(key)}><span>{day.getDate()}</span>{count > 0 && <i className="calendar-count">{count}</i>}</button>; })}</div></section><aside className="calendar-agenda"><span className="eyebrow">DAY PLAN</span><h2>{displayDate(selected, { weekday: 'long', month: 'short', day: 'numeric' })}</h2>{selectedTasks.length ? <div className="agenda-list">{selectedTasks.map((task) => <TaskRow key={task.id} task={task} onEdit={onEdit} onUpdate={onUpdate} onDelete={onDelete} />)}</div> : <EmptyState title="A clear page" detail="Nothing on the calendar yet." />}<button className="add-inline" onClick={() => onAdd(selected)}><Plus size={17} />Add to this day</button></aside></div></div>;
}

function Settings({ user }) { return <div className="page"><PageHeading eyebrow="This device" title="Settings" subtitle="Your planner is saved in this browser." /><section className="settings-panel"><span className="eyebrow">LOCAL PLANNER</span><div className="settings-profile"><span className="avatar avatar-large">{user.name.slice(0, 1).toUpperCase()}</span><div><h2>{user.name}</h2><span>Daymark planner</span></div></div><div className="settings-rule" /><div className="settings-item"><div><strong>Storage</strong><span>Tasks and diary notes stay in this browser.</span></div><span>This device</span></div><div className="settings-rule" /><div className="settings-item"><div><strong>Privacy</strong><span>Your planner data is not sent to a server.</span></div><span className="privacy-label"><Check size={14} />Local</span></div></section></div>; }

function TaskModal({ task, initialDate, onSave, onClose }) {
	const [saving, setSaving] = useState(false);
	const [error, setError] = useState('');
	const submit = async (event) => {
		event.preventDefault(); setSaving(true); setError('');
		const values = Object.fromEntries(new FormData(event.currentTarget));
		try { await onSave({ ...values, id: task?.id, reminder: values.reminder || 'None' }); }
		catch (err) { setError(err.message); }
		finally { setSaving(false); }
	};
	useEffect(() => { const listener = (event) => event.key === 'Escape' && onClose(); window.addEventListener('keydown', listener); return () => window.removeEventListener('keydown', listener); }, [onClose]);
	return <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><form className="task-modal" onSubmit={submit}><div className="modal-heading"><div><span className="eyebrow">{task ? 'MAKE AN ADJUSTMENT' : 'MAKE A LITTLE PLAN'}</span><h2>{task ? 'Edit task' : 'Add a task'}</h2></div><button className="icon-button" type="button" onClick={onClose} aria-label="Close"><X size={19} /></button></div><div className="modal-fields"><label className="field-wide">Task title<input name="title" required maxLength="160" defaultValue={task?.title || ''} placeholder="What would you like to get done?" autoFocus /></label><label className="field-wide">A few details<textarea name="description" maxLength="1000" defaultValue={task?.description || ''} placeholder="Add a note (optional)" rows="2" /></label><label>Subject<input name="subject" maxLength="80" defaultValue={task?.subject || ''} placeholder="e.g. Biology" /></label><label>Date<input name="date" type="date" required defaultValue={task?.date || initialDate || todayKey()} /></label><label>Start time<input name="startTime" type="time" defaultValue={task?.startTime || ''} /></label><label>Due time<input name="dueTime" type="time" defaultValue={task?.dueTime || ''} /></label><label>Task type<select name="type" defaultValue={task?.type || 'Daily Task'}>{['Daily Task', 'Homework', 'Study', 'Project', 'Personal', 'College', 'School', 'Other'].map((item) => <option key={item}>{item}</option>)}</select></label><label>Priority<select name="priority" defaultValue={task?.priority || 'Medium'}><option>Low</option><option>Medium</option><option>High</option></select></label><label>Status<select name="status" defaultValue={task?.status || 'Pending'}><option>Pending</option><option>In Progress</option><option>Completed</option></select></label><label className="field-wide">Reminder<select name="reminder" defaultValue={task?.reminder || 'None'}><option>None</option><option>10 minutes before</option><option>30 minutes before</option><option>1 hour before</option><option>1 day before</option></select></label></div>{error && <div className="form-error" role="alert">{error}</div>}<div className="modal-footer"><button type="button" className="secondary-button" onClick={onClose}>Cancel</button><button className="primary-button" disabled={saving}>{saving ? 'Saving…' : task ? 'Save changes' : 'Save task'}<Check size={16} /></button></div></form></div>;
}

export default Apps;
