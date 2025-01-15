import React from 'react';
import { Card } from 'react-bootstrap';
import '../App.css';

// App Component: Album Card Component
// Author: @gulIbrahimi
function AlbumCard({ album }) {
    return (
        <Card className="album-card text-center">
            <Card.Img 
                variant="top" 
                src={album.images[0]?.url || "default-placeholder.png"} 
                alt={album.name} 
            />
            <Card.Body>
                <Card.Title>{album.name}</Card.Title>
            </Card.Body>
        </Card>
    );
}

export default AlbumCard;
