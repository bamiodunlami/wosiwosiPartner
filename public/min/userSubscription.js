try{let t=$("#interest"),e=$("#roiInfo"),a=$("#totalToGet"),r=$("#roipercent"),l=$("#roiValue"),n=$("#currency"),o=$(".currencySign");function showValue(){let i=t.val();i>1999.9?(r.text("20"),e.text(.2*i),a.text(1.2*i),o.text(n.val()),l.val(`${i} at 20%`),alert(i),$("#submitBtn").prop("disabled",!1)):i<2e3&&(r.text("0"),e.text("0"),a.text("0"),$("#submitBtn").prop("disabled",!0))}t.on("change",(()=>{showValue()}))}catch(i){}