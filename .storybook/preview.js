import isChromatic from "chromatic/isChromatic";

export const args = {
    date: isChromatic() && new Date(2020, 8, 22),
};

export const parameters = {
    options: { showPanel: true },
};
