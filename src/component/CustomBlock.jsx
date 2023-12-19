import React, { useState, useEffect } from 'react';
import supabase from '../config/supabase';
import './customBlock.css'
const CustomBlock = () => {
    const [cssData, setCssData] = useState('');


    //fetch 
    useEffect(() => {
        const fetchCssData = async () => {
            try {
                const { data, error } = await supabase
                    .from('css_styles')
                    .select('css_content')


                if (error) {
                    throw error;
                }

                // Assuming the 'css_content' field contains CSS code
                if (data) {
                    setCssData(data.css_content);
                }
            } catch (error) {
                console.error('Error fetching CSS data:', error.message);
            }
        };

        fetchCssData();
    }, []);

    useEffect(() => {
        // Create a <style> tag dynamically
        const styleTag = document.createElement('style');
        styleTag.innerHTML = cssData; // Assign the fetched CSS data

        // Append the <style> tag to the document's head
        document.head.appendChild(styleTag);

        return () => {   
            // Cleanup: Remove the <style> tag when component unmounts
            document.head.removeChild(styleTag);
        };
    }, [cssData]);

    return (
        <div className='author-info'>
            <div>
                <h3 className='author-info h3'>
                    Pawan  Rajput
                </h3>
                <p>Rajput i m pawan rajput</p>
            </div>
        </div>
    );
};

export default CustomBlock;
