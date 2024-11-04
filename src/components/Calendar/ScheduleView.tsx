import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { DateSelectArg, EventClickArg } from '@fullcalendar/core';
import { useStore } from '../../store/useStore';
import ContextMenu from './ContextMenu';

interface ContextMenuState {
  show: boolean;
  x: number;
  y: number;
  eventId: string;
}

export default function ScheduleView() {
  const { events, addEvent, removeEvent } = useStore();
  const [contextMenu, setContextMenu] = useState<ContextMenuState>({
    show: false,
    x: 0,
    y: 0,
    eventId: '',
  });

  const handleEventAdd = (selectInfo: DateSelectArg) => {
    const title = prompt('Please enter a title for your event:');
    if (!title) return;

    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();

    addEvent({
      id: crypto.randomUUID(),
      title,
      start: selectInfo.start,
      end: selectInfo.end,
      employeeId: '',
      color: '#4f46e5'
    });
  };

  const handleEventRemove = (eventId: string) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      removeEvent(eventId);
      setContextMenu({ show: false, x: 0, y: 0, eventId: '' });
    }
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    clickInfo.jsEvent.preventDefault();
  };

  const handleEventContextMenu = (clickInfo: EventClickArg) => {
    clickInfo.jsEvent.preventDefault();
    const { pageX, pageY } = clickInfo.jsEvent;
    setContextMenu({
      show: true,
      x: pageX,
      y: pageY,
      eventId: clickInfo.event.id,
    });
  };

  const handleColorChange = (color: string) => {
    const updatedEvents = events.map(event => 
      event.id === contextMenu.eventId ? { ...event, color } : event
    );
    useStore.setState({ events: updatedEvents });
    setContextMenu({ show: false, x: 0, y: 0, eventId: '' });
  };

  return (
    <div className="h-full bg-white rounded-lg shadow-lg p-6">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={true}
        events={events}
        select={handleEventAdd}
        eventClick={handleEventClick}
        eventDidMount={(info) => {
          info.el.addEventListener('contextmenu', (e) => {
            handleEventContextMenu({
              ...info,
              jsEvent: e as unknown as MouseEvent,
            } as EventClickArg);
          });
        }}
        height="auto"
        allDaySlot={false}
        slotMinTime="08:00:00"
        slotMaxTime="20:00:00"
        businessHours={{
          daysOfWeek: [1, 2, 3, 4, 5],
          startTime: '08:00',
          endTime: '20:00',
        }}
      />
      {contextMenu.show && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onDelete={() => handleEventRemove(contextMenu.eventId)}
          onColorChange={handleColorChange}
          onClose={() => setContextMenu({ show: false, x: 0, y: 0, eventId: '' })}
        />
      )}
    </div>
  );
}