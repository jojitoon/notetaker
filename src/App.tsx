import './App.css';

import React, { useEffect, useState } from 'react';

import logo from './logo.svg';

type Note = {
    body: string;
    date: Date;
};
const App: React.FC = () => {
    const [value, setValue] = useState('');
    const [notes, setNotes] = useState<[Note] | Note[] | null>(null);

    useEffect(() => {
        const notes = localStorage.getItem('allnotes');
        if (notes) {
            setNotes(JSON.parse(notes));
        }
    }, []);
    useEffect(() => {
        localStorage.setItem('allnotes', JSON.stringify(notes));
    }, [notes]);

    return (
        <div className="App">
            <header className="App-header">
                <div>Note Taker</div>
                <img src={logo} className="App-logo" alt="logo" />
                <span>use shift + enter to add new line</span>
                <textarea
                    className="input"
                    rows={4}
                    value={value}
                    onChange={e => {
                        setValue(`${e.target.value}`);
                    }}
                    onKeyUp={event => {
                        if (event.key === 'Enter') {
                            if (event.shiftKey) {
                                return null;
                            } else {
                                if (value.trim() && value.trim().length) {
                                    const newvalue: Note = {
                                        body: value,
                                        date: new Date(),
                                    };
                                    const upload: [Note] | Note[] = notes ? [...notes] : [];
                                    upload.unshift(newvalue);
                                    setNotes(upload);
                                    setValue('');
                                }
                            }
                        }
                    }}
                />

                <div className="container">
                    {notes &&
                        notes.map((note, i) => (
                            <div className="notes" key={i}>
                                {note.body}
                                <span>{new Date(note.date).toDateString()}</span>
                            </div>
                        ))}
                </div>
            </header>
            <div className="foot">NoteTaker - by joji @2020</div>
        </div>
    );
};

export default App;
