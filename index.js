import {
    afterUpdate
} from "svelte";
import {
    writable
} from "svelte/store";

const Validator = function (formFieldGetter, constraints) {

    let prevFormFieldValues = formFieldGetter();
    let backendErrors = {};
    let dirty = {};
    let valid = {};
    let invalid = {};
    let isFormValid = false;
    let isFormDirty = false;

    const {
        subscribe,
        update
    } = writable({
        dirty,
        valid,
        invalid,
        isFormValid,
        isFormDirty
    });

    const reset = function () {
        dirty = {};
        isFormDirty = false;
        backendErrors = {};
        valid = {};
        dirty = {};
        invalid = {};
    }

    const setBackendErrors = function (errors) {

        backendErrors = errors || {};
        valid = {};
        dirty = {};
        invalid = errors;

        for (let key in prevFormFieldValues)
            if (!invalid[key]) valid[key] = true;

        update((n) => {
            n.dirty = dirty;
            n.valid = {};
            n.invalid = errors;
            return n;
        });
    }

    afterUpdate(() => {
        valid = {};
        invalid = {};
        isFormValid = false;
        let newFormFieldValues = formFieldGetter();

        for (let key in newFormFieldValues) {
            if (prevFormFieldValues[key] != newFormFieldValues[key] && prevFormFieldValues[key] !== undefined) {
                dirty[key] = true;
                isFormDirty = true;
            }
            prevFormFieldValues[key] = newFormFieldValues[key];
        }

        if (Object.keys(dirty).length > 0) {

            let validateResult = validate(newFormFieldValues, constraints);

            for (let key in validateResult)
                if (dirty[key]) invalid[key] = validateResult[key];

            for (let key in newFormFieldValues)
                if (dirty[key] && !invalid[key]) valid[key] = true;

            isFormValid = (Object.keys(valid).length === Object.keys(newFormFieldValues).length) || (Object.keys(backendErrors).length > 0 && Object.keys(invalid).length === 0);

            update((n) => {
                n.dirty = dirty;
                n.valid = valid;
                n.invalid = invalid;
                n.isFormValid = isFormValid;
                n.isFormDirty = isFormDirty;
                return n;
            });
        }
    });

    return {
        subscribe,
        reset,
        setBackendErrors
    };
};

export default Validator;