frappe.ui.form.on("SC Bill Entry", {
    refresh(frm) {},
    total_boq_amount: function(frm) {
        totalAmountWithoutVat(frm);
    },
    sundry_cost_miscellaneous_cost: function(frm) {
        totalAmountWithoutVat(frm);
    },
    addition_and_deduction_maintenance: function(frm) {
        totalAmountWithoutVat(frm);
    },
    vat: function(frm) {
        var currentValue = frm.doc.vat;
        $('[data-fieldname="vat"] input').val(currentValue + "%");
        totalAmountWithoutVat(frm);
    },
    advance_deduction: function(frm) {
        totalAmountWithoutVat(frm);
    },
    tds_15_deduction: function(frm) {
        totalAmountWithoutVat(frm);
    }
});

function totalAmountWithoutVat(frm) {
    var total_amount = frm.doc.total_boq_amount + frm.doc.sundry_cost_miscellaneous_cost + frm.doc.addition_and_deduction_maintenance;
    frm.set_value("total_amount_without_vat", total_amount);

    var vatAmount = (frm.doc.total_amount_without_vat * frm.doc.vat) / 100;
    frm.set_value("vat_amount", vatAmount);

    var total_amount_with_vat = frm.doc.total_amount_without_vat + vatAmount;
    frm.set_value("total_amount_with_vat", total_amount_with_vat);

    var deductionValue = (frm.doc.tds_15_deduction * total_amount_with_vat) / 100;
    frm.set_value('deduction_amount', deductionValue);

    var total_payable_amount = total_amount_with_vat - deductionValue - (frm.doc.advance_deduction || 0);
    frm.set_value('total_payable_amount', total_payable_amount);

    frm.refresh_field('total_payable_amount');
    frm.refresh_field('total_amount_with_vat');
    frm.refresh_field('deduction_amount');
}