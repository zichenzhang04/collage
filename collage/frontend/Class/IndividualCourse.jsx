import React, {useState, lazy, useEffect} from 'react';
import { IconCircleArrowLeft } from '@tabler/icons-react';
import { ActionIcon, rem } from '@mantine/core';
import '../CSS/classPreview.css';
import '../CSS/course_tag.css';
const Preview = lazy(() => import('./Preview'))
const SuggestedConnections = lazy(() => import('./SuggestedConnections'))

const IndividualCourse = ({courseId, handleBack}) => {
    return (
        <div className="full-page">
            <div className="course-grid">
                <div className="back-button">
                    <ActionIcon variant="subtle" aria-label="Back" size="xl" onClick={() => handleBack()}>
                        <IconCircleArrowLeft stroke={1} color="#242424" style={{ width: rem(80), height: rem(80) }}/>
                    </ActionIcon>
                </div>
                <Preview/>
                <SuggestedConnections/>
            </div>
        </div>
        
    )
}

export default IndividualCourse