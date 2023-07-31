import { showModal } from '../render-modal/render-modal';
import './render-add-button.css'
/**
 * 
 * @param {HTMLDivElement} element 
//  * @param {() => void} callback
 */
export const renderAddButton = (element) => {

    const fabButton = document.createElement('button');
    fabButton.innerText = '+';
    fabButton.className = 'fab-button';
    
    element.append(fabButton);

    //TODO
    fabButton.addEventListener('click', () => {
        showModal();
    });
}

