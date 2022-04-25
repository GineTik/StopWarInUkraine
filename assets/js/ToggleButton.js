export class ToggleButton {
    constructor(button, activeState, previosState) {
        if ((activeState instanceof ToggleState && 
            previosState instanceof ToggleState) == false) {
                throw new TypeError("Передаваемые параметры не являются типом ToggleState")
        }

        this.button = button;
        this.activeState = activeState;
        this.previosState = previosState;

        this.button.onclick = this.#onClick.bind(this);
        this.#createIcon();
    }

    #createIcon() {
        this.icon = document.createElement("ion-icon");
        
        var nameAttribute = document.createAttribute("name");
        this.icon.setAttributeNode(nameAttribute);
        this.#setIcon(this.activeState.iconName);

        this.button.innerHTML = "";
        this.button.append(this.icon);
    }

    #setIcon(iconName) {
        this.icon.setAttribute("name", iconName);
    }

    #activateState(newActiveState) {
        this.previosState = this.activeState;
        this.activeState = newActiveState;
    }

    #onClick() {
        this.activeState.onClick();
        this.#activateState(this.previosState);
        this.#setIcon(this.activeState.iconName);
    }
}

export class ToggleState {
    constructor(iconName, onClickCallback) {
        this.iconName = iconName;
        this.onClick = onClickCallback;
    }
}