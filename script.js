const main_table = document.getElementById("main_table");

async function get_local_json() {
  try {
    const res = await fetch('words.json');
    if (!res.ok) throw new Error(`HTTPエラー: ${res.status}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('データの取得に失敗しました:', error);
  }
}

async function expand_text() {
    const words_data = await get_local_json();
    if (!words_data) return;
  
    for (let i = 0; i < words_data.data.length; i++) {
      const tr = document.createElement("tr");
  
      const japanese_span = document.createElement("span");
      const english_span = document.createElement("span");
  
      const number = document.createElement("td");
      const english = document.createElement("td");
      const japanese = document.createElement("td");
  
      const checkbox_japanese = document.createElement("input");
      checkbox_japanese.type = "checkbox";
      checkbox_japanese.id = `box_japanese_${i}`;
      checkbox_japanese.style.marginRight = "8px";
      checkbox_japanese.style.width = "20px";
      checkbox_japanese.style.height = "20px";
  
      const checkbox_English = document.createElement("input");
      checkbox_English.type = "checkbox";
      checkbox_English.id = `box_English_${i}`;
      checkbox_English.style.marginRight = "8px";
      checkbox_English.style.width = "20px";
      checkbox_English.style.height = "20px";
  
      number.innerText = words_data.data[i][1];
      english_span.innerText = words_data.data[i][2];
      japanese_span.innerText = words_data.data[i][3];
  
      // チェックボックスクリックで非表示
      checkbox_japanese.addEventListener("change", () => {
        if (checkbox_japanese.checked) {
          japanese_span.style.opacity = "0";
        } else {
          japanese_span.style.opacity = "1";
        }
      });
  
      checkbox_English.addEventListener("change", () => {
        if (checkbox_English.checked) {
          english_span.style.opacity = "0";
        } else {
          english_span.style.opacity = "1";
        }
      });
  
      if (i % 2 === 0) {
          tr.style.backgroundColor = "#f0f8ff";
      }
  
      japanese.appendChild(checkbox_japanese);
      japanese.appendChild(japanese_span);
      english.appendChild(checkbox_English);
      english.appendChild(english_span);
  
      tr.appendChild(number);
      tr.appendChild(english);
      tr.appendChild(japanese);
  
      main_table.appendChild(tr);
    }
}

// HTML読み込み後に実行
document.addEventListener("DOMContentLoaded", expand_text);

async function input_table () {
    const words_data = await get_local_json();
    if (!words_data) return;

    const range1 = parseInt(document.getElementById("range1").value);
    const range2 = parseInt(document.getElementById("range2").value);
    const hide_japanese = document.getElementById("hide_japanese").checked;
    const hide_English = document.getElementById("hide_English").checked;

    if (range1 < 1 || range2 > words_data.data.length || range1 > range2 || isNaN(range1) || isNaN(range2)) {
        alert("正しい範囲を入力してください。");
        return;
    }

    main_table.innerHTML = "";

    for (let i = range1 - 1; i < range2; i++) {
        const tr = document.createElement("tr");

        const number = document.createElement("td");
        const english = document.createElement("td");
        const japanese = document.createElement("td");

        const english_span = document.createElement("span");
        const japanese_span = document.createElement("span");

        number.innerText = words_data.data[i][1];
        english_span.innerText = words_data.data[i][2];
        japanese_span.innerText = words_data.data[i][3];

        // チェックボックス
        const checkbox_japanese = document.createElement("input");
        checkbox_japanese.type = "checkbox";
        checkbox_japanese.id = `box_japanese_${i}`;
        checkbox_japanese.style.marginRight = "8px";
        checkbox_japanese.style.width = "20px";
        checkbox_japanese.style.height = "20px";

        if (hide_japanese) checkbox_japanese.checked = true;

        const checkbox_English = document.createElement("input");
        checkbox_English.type = "checkbox";
        checkbox_English.id = `box_English_${i}`;
        checkbox_English.style.marginRight = "8px";
        checkbox_English.style.width = "20px";
        checkbox_English.style.height = "20px";

        if (hide_English) checkbox_English.checked = true;

        // 初期非表示
        if (hide_japanese) japanese_span.style.opacity = "0";
        if (hide_English) english_span.style.opacity = "0";

        // チェックボックスクリックで非表示
        checkbox_japanese.addEventListener("change", () => {
            if (checkbox_japanese.checked) {
                japanese_span.style.opacity = "0";
                checkbox_japanese.checked = true;
            } else {
                japanese_span.style.opacity = "1";
            }
        });

        checkbox_English.addEventListener("change", () => {
            if (checkbox_English.checked) {
                english_span.style.opacity = "0";
                checkbox_English.checked = true;
            } else {
                english_span.style.opacity = "1";
            }
        });

        // 偶数行の背景色
        if (i % 2 === 0) tr.style.backgroundColor = "#f0f8ff";

        // 要素を組み立て
        japanese.appendChild(checkbox_japanese);
        japanese.appendChild(japanese_span);
        english.appendChild(checkbox_English);
        english.appendChild(english_span);

        tr.appendChild(number);
        tr.appendChild(english);
        tr.appendChild(japanese);

        main_table.appendChild(tr);
    }
}
