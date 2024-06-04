import React, { useState } from 'react';
import './NoteBox.scss';
import httpRequest from '~/util/httpRequest';

const NoteBox = ({ noteDetail, onDelete }) => {
    const [editIndex, setEditIndex] = useState(null);
    const [editContent, setEditContent] = useState('');

    const handleEditClick = (index, content) => {
        setEditIndex(index);
        setEditContent(content);
    };

    const handleSaveClick = (index) => {
        const updatedNote = {
            Id: noteDetail[index].id,
            IdRecord: noteDetail[index].id_record,
            Content: editContent,
            ImgUrl: noteDetail[index].ImgUrl || 'new url',
        };

        httpRequest
            .put(`/note/update`, updatedNote, { withCredentials: true })
            .then((response) => {
                const updatedNotes = [...noteDetail];
                updatedNotes[index].content = editContent;
                updatedNotes[index].update_at = new Date();
                setEditIndex(null);
                setEditContent('');
            })
            .catch((error) => {
                console.error('There was an error updating the note!', error);
            });
    };

    const handleCancelClick = () => {
        setEditIndex(null);
        setEditContent('');
    };

    const handleDeleteClick = (index) => {
        const id = noteDetail[index].id;
        httpRequest
            .delete(`/note/delete?id=${id}`, { withCredentials: true })
            .then((response) => {
                onDelete(); // Call the onDelete function passed from the parent component
            })
            .catch((error) => {
                console.error('There was an error deleting the note!', error);
            });
    };

    return (
        <div className="col-md-8 note-box">
            {noteDetail && noteDetail.length > 0 ? (
                noteDetail.map((note, index) => (
                    <div className="row note-element" key={index}>
                        <div className="col-md-11">
                            {editIndex === index ? (
                                <div className="row">
                                    <textarea
                                        className="update-note-box col-md-11"
                                        type="text"
                                        value={editContent}
                                        onChange={(e) => setEditContent(e.target.value)}
                                    />
                                    <div className="col-md-1 option-box">
                                        <div onClick={() => handleSaveClick(index)}>Lưu</div>
                                        <div onClick={handleCancelClick}>Hủy</div>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <li>{note.content}</li>
                                    <p className="time">
                                        {new Date(note.update_at).toLocaleString('vi-VN')} - {note.Doctor?.fullname}
                                    </p>
                                </>
                            )}
                        </div>
                        <div className="col-md-1 option-box">
                            {editIndex === index ? null : (
                                <>
                                    <div onClick={() => handleEditClick(index, note.content)}>Sửa</div>
                                    <div onClick={() => handleDeleteClick(index)}>Xóa</div>
                                </>
                            )}
                        </div>
                    </div>
                ))
            ) : (
                <p className="NA-note">Chưa có ghi chú</p>
            )}
        </div>
    );
};

export default NoteBox;
