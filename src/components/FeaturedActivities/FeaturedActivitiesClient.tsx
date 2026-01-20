'use client';

import React, { useState, useEffect } from 'react';
import { Star, MapPin } from 'lucide-react';
import { FeaturedActivity } from './FeaturedActivitiesServer';
import {
  carouselContainerStyles,
  carouselHeaderStyles,
  carouselTitleStyles,
  carouselWrapperStyles,
  carouselTrackStyles,
  carouselSlideStyles,
  activityCardStyles,
  activityImageStyles,
  activityContentStyles,
  activityTitleStyles,
  activityLocationStyles,
  activityMetaStyles,
  activityPriceStyles,
  dotsContainerStyles,
  dotStyles,
  dotActiveStyles
} from './FeaturedActivities.styles';

interface FeaturedActivitiesClientProps {
  activities: FeaturedActivity[];
  className?: string;
}

export default function FeaturedActivitiesClient({ activities, className }: FeaturedActivitiesClientProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-scroll effect
  useEffect(() => {
    if (activities.length <= 1 || isHovered) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % activities.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [activities.length, isHovered]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  if (activities.length === 0) {
    return (
      <div style={carouselContainerStyles} className={className}>
        <div style={carouselHeaderStyles}>
          <h3 style={carouselTitleStyles}>Featured Activities</h3>
        </div>
        <div style={{ 
          height: '160px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          color: 'var(--color-text-secondary)'
        }}>
          No featured activities found
        </div>
      </div>
    );
  }

  return (
    <div 
      style={carouselContainerStyles} 
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={carouselHeaderStyles}>
        <h3 style={carouselTitleStyles}>Featured Activities</h3>
      </div>
      
      <div style={carouselWrapperStyles}>
        <div 
          style={{
            ...carouselTrackStyles,
            transform: `translateX(-${currentSlide * 100}%)` // Each slide is 100% width
          }}
        >
          {activities.map((activity, index) => (
            <div key={activity.id} style={carouselSlideStyles}>
              <div style={activityCardStyles}>
                {activity.imageUrl && (
                  <div style={activityImageStyles}>
                    <img 
                      src={activity.imageUrl} 
                      alt={activity.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }}
                    />
                  </div>
                )}
                <div style={activityContentStyles}>
                  <h4 style={activityTitleStyles}>{activity.title}</h4>
                  {activity.location && (
                    <div style={activityLocationStyles}>
                      <MapPin size={12} />
                      <span>{activity.location.name}</span>
                    </div>
                  )}
                  <div style={activityMetaStyles}>
                    <div style={activityPriceStyles}>
                      {activity.isFree ? 'Free' : activity.costDisplay || 'Contact for pricing'}
                    </div>
                    {activity.featured && (
                      <Star size={12} style={{ color: 'var(--color-warning-500)' }} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {activities.length > 1 && (
          <div style={dotsContainerStyles}>
            {activities.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                style={currentSlide === index ? dotActiveStyles : dotStyles}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}