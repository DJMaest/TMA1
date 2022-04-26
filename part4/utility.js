const measurementConverter = $("#mConverter");
const mortgageCalc = $("#mortgageCalculator");
const todoList = $("#todoList");
const calcArea = $("#calcArea");
var type = "";
let todoIndex = 0;

function convertFromMeters(val, targetUnit) {
    switch (targetUnit) {
        case "m":
            return val;
        case "ft":
            return val * 3.28084;
        case "mi":
            return val / 1609.34;
        case "in":
            return val * 39.3701;
    }
}

function convertToMeters(val, fromUnit) {
    switch (fromUnit) {
        case "m":
            return val;
        case "ft":
            return val / 3.28084;
        case "mi":
            return val * 1609.34;
        case "in":
            return val / 39.3701;
    }
}



function convertFromMetersSquared(val, targetUnit) {
    switch (targetUnit) {
        case "m^2":
            return val;
        case "ft^2":
            return val * 10.7639;
        case "mi^2":
            return val / (2.59 * Math.pow(10, 6));
        case "in^2":
            return val * 1550;
    }
}

function convertToMetersSquared(val, fromUnit) {
    switch (fromUnit) {
        case "m^2":
            return val;
        case "ft^2":
            return val / 10.7639;
        case "mi^2":
            return val * (2.59 * Math.pow(10, 6));
        case "in^2":
            return val / 1550;
    }
}

function convertFromMetersCube(val, targetUnit) {
    switch (targetUnit) {
        case "m^3":
            return val;
        case "ft^3":
            return val * 35.3147;
        case "li":
            return val * 1000;
        case "in^3":
            return val * 61023.801579099;
    }
}

function convertToMetersCube(val, fromUnit) {
    switch (fromUnit) {
        case "m^3":
            return val;
        case "ft^3":
            return val / 35.3147;
        case "li":
            return val / 1000;
        case "in^3":
            return val / 61023.801579099;
    }
}

function convertFromKg(val, targetUnit) {
    switch (targetUnit) {
        case "kg":
            return val;
        case "g":
            return val * 1000;
        case "lb":
            return val * 2.20462;
        case "ounce":
            return val * 35.274;
    }
}

function convertToKg(val, fromUnit) {
    switch (fromUnit) {
        case "kg":
            return val;
        case "g":
            return val / 1000;
        case "lb":
            return val / 2.20462;
        case "ounce":
            return val / 35.274;
    }
}

function convertVal(val, type, units) {
    const { initial, target } = units;
    console.log(type);
    switch (type) {
        case "area": {
            if (initial === "m^2") {
                return convertFromMetersSquared(val, target);
            } else {
                // for every other case
                const temp = convertToMetersSquared(val, initial);
                return convertFromMetersSquared(temp, target);
            }
        }
        case "length": {
            if (initial === "m") {
                return convertFromMeters(val, target);
            } else {
                // for every other case
                const temp = convertToMeters(val, initial);
                return convertFromMeters(temp, target);
            }
        }
        case "volume": {
            if (initial === "m^3") {
                return convertFromMetersCube(val, target);

            } else {
                // for every other case
                const temp = convertToMetersCube(val, initial);
                return convertFromMetersCube(temp, target);
            }

            break;
        }
        case "weight": {
            if (initial === "kg") {
                return convertFromKg(val, target);
            } else {
                // for every other case
                const temp = convertToKg(val, initial);
                return convertFromKg(temp, target);
            }
        }

    }

}
function handleConverterListeners() {
    calcArea.load("./MeasurementConverter/measurementConverter.html", () => {

        const initialUnit = $("#initialUnit");
        const targetUnit = $("#targetUnit");
        const initialValue = $("#initialValue");
        const targetValue = $("#targetValue");
        type = $("#measurementType option:selected").val();
        initialUnit.load("./MeasurementConverter/areaUnits.html"); // default is area
        targetUnit.load("./MeasurementConverter/areaUnits.html");


        $("#measurementType").change((e) => {
            type = e.target.value;
            initialValue.val(0.0);
            targetValue.val(0.0);
            switch (type) {
                case "area": {
                    initialUnit.load("./MeasurementConverter/areaUnits.html"); // default is area
                    targetUnit.load("./MeasurementConverter/areaUnits.html");
                    break;
                }
                case "length": {
                    initialUnit.load("./MeasurementConverter/lengthUnits.html"); // set type to length
                    targetUnit.load("./MeasurementConverter/lengthUnits.html");
                    break;
                }
                case "volume": {
                    initialUnit.load("./MeasurementConverter/volumeUnits.html"); // set type to volume
                    targetUnit.load("./MeasurementConverter/volumeUnits.html");
                    break;
                }
                case "weight": {
                    initialUnit.load("./MeasurementConverter/weightUnits.html"); // set type to weight
                    targetUnit.load("./MeasurementConverter/weightUnits.html");
                    break;
                }

            }
        });

        initialValue.change((e) => {
            const val = e.target.value;
            const target = convertVal(val, type, { initial: $("#initialUnit option:selected").val(), target: $("#targetUnit option:selected").val() });
            targetValue.val(target);
        })

        initialUnit.change((e) => {
            const unit = e.target.value;
            const val = $("#initialValue").val();
            const target = convertVal(val, type, { initial: unit, target: $("#targetUnit option:selected").val() });
            targetValue.val(target);

        });

        targetUnit.change((e) => {
            const unit = e.target.value;
            const val = $("#initialValue").val();
            const target = convertVal(val, type, { initial: $("#initialUnit option:selected").val(), target: unit });
            targetValue.val(target);

        });

    });

}

function handleMortgageListeners() {
    calcArea.load("./MortgageCalculator/mortgageCalc.html", () => {
        const mortgageForm = $("#mortgageForm");
        mortgageForm.submit((e) => {
            e.preventDefault();
            const paymentLabel = $("#monthlyPayment");
            const data = mortgageForm.serializeArray();
            const downPayment = parseFloat(data.find(e => e.name === "downPayment").value);

            const price = parseFloat(data.find(e => e.name === "price").value);
            const period = parseInt(data.find(e => e.name === "period").value);
            const months = period * 12;
            const interest = parseFloat(data.find(e => e.name === "interest").value); // annual interest rate
            const monthlyInterest = interest / (12 * 100);
            const principal = price - downPayment;
            const monthly = (principal * (monthlyInterest * Math.pow(monthlyInterest + 1, months))) / (Math.pow((1 + monthlyInterest), months) - 1);
            console.log(monthly);
            paymentLabel.text(monthly);
        })

    });
}

function handleToDoList() {
    calcArea.load("./ToDoList/todolist.html", () => {
        const listItems = $("#listItems");
        const item = $("#listItem");
        const addItem = $("#addItem");
        const newListBtn = $("#newList");
        addItem.submit((e) => {
            e.preventDefault()
            listItems.append(`
            <div class="list-item" id="container-${todoIndex}">
                <input class="list-checkbox" type="checkbox" id="done-${todoIndex}"><span class="item-content" id="item-${todoIndex}">${item.val()}</span> <input class="delete-item" id="delete-${todoIndex}" type="image" src="./images/delete-icon.png" />
            </div>`);
            const itemSelect = $(`#done-${todoIndex}`);
            itemSelect.on('click', () => {

                console.log(itemSelect.is(':checked'));

                const currentIndex = itemSelect.attr('id').split('-')[1];
                const itemText = $(`#item-${currentIndex}`);
                if (!itemSelect.is(':checked')) {
                    itemText.css('text-decoration', '');
                    return;
                }
                itemText.css('text-decoration', 'line-through');
            });
            const deleteBtn = $(`#delete-${todoIndex}`);
            deleteBtn.on('click', () => {
                const currentIndex = itemSelect.attr('id').split('-')[1];
                const itemToRemove = $(`#container-${currentIndex}`);
                itemToRemove.remove();

            });
            item.val('');
            todoIndex++;
        });

        newListBtn.on('click', () => {
            listItems.html('');
            todoIndex = 0;
        });

    });
}

window.onload = () => {
    handleConverterListeners();
    measurementConverter.attr("disabled", true);
    mortgageCalc.attr("disabled", false);
    todoList.attr("disabled", false);
};

measurementConverter.on('click', () => {
    handleConverterListeners();
    todoIndex = 0;
    measurementConverter.attr("disabled", true);
    mortgageCalc.attr("disabled", false);
    todoList.attr("disabled", false);
});

mortgageCalc.on('click', () => {
    handleMortgageListeners();
    todoIndex = 0;
    measurementConverter.attr("disabled", false);
    mortgageCalc.attr("disabled", true);
    todoList.attr("disabled", false);
});

todoList.on('click', () => {
    handleToDoList();
    measurementConverter.attr("disabled", false);
    mortgageCalc.attr("disabled", false);
    todoList.attr("disabled", true);
});