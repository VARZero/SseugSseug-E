let editor, OneLine, editMode; // 고정적으로 지정되는 노드 (에디터, OneLine 레퍼런스)
let textW, OneLH; // 글자, 레퍼런스 노드 길이요소 
let SelcLine, nowEditing; // 선택된 노드 포인터들
let chkMove = [0, 0]; // 오차 확인할때 사용
let FileText;
let Lines = [];
let editSelStart = null; let editSelEnd = undefined; // edit mode 진입시 삭제 범위
let activeDraw = 0; // 캔버스 드로우 상태
let firstPoint = [undefined, undefined];
let pp = [undefined, undefined];
let canvasN, ctx;
let fontsize = Number(getComputedStyle(document.documentElement).getPropertyValue("--fontsize").replace(/[^0-9]/g,""));

function DeleteEditing(){ // 수정 모드 해제
    if (nowEditing == undefined){return 0;}
    document.body.classList.remove("block");
    document.querySelector("div.editing > div#editMode").remove();
    nowEditing.addEventListener("pointerdown", InTextPD);
    nowEditing.classList.remove("editing");
    nowEditing = undefined;
    editSelStart = null; editSelEnd = undefined;
    canvasN = undefined;
    ctx = undefined;
    activeDraw = 0;
    pp = [undefined, undefined];
    firstPoint = [undefined, undefined];
    return 1;
}

function editModeSet(editNode){
    // 편집모드 세팅
    SelCharRef = editNode.children[0].children[0].children[0].children[0];
    insCharRef = editNode.children[0].children[0].children[1].children[0];
    LineNum = nowEditing.parentNode.id.replace(/[^0-9]/g,""); // 라인 번호 가져오기

    charNum = 0;
    for (Char of Lines[LineNum-1]){
        NewSel = SelCharRef.cloneNode(true); NewSel.id += String(charNum);
        SelCharRef.parentNode.append(NewSel);
        NewSel.innerText = Char;
        BoxWid = NewSel.offsetWidth;
        editSelStart = null;

        NewSel.addEventListener("pointerdown", InSelPD);

        NewIns = insCharRef.cloneNode(true); NewIns.id += String(charNum);
        insCharRef.parentNode.append(NewIns);
        NewIns.style.width = BoxWid;

        NewIns.addEventListener("pointerdown", InInsPD);

        charNum += 1;
    }

    AppendPrnt = editNode.children[0].children[1];
    for(AppendCh of AppendPrnt.children){
        AppendCh.addEventListener("pointerdown", InAppendPD);
    }
}

function appendSet(canvArea){
    // 글 뒤에 글을 추가하기 위해 캔버스 생성
    NewCanv = document.createElement('canvas');
    canvasN = NewCanv; ctx = canvasN.getContext("2d");
    canvArea.append(NewCanv);
    setCanvasWH(NewCanv);
    NewCanv.addEventListener("pointerdown", CanvinPD);
    NewCanv.addEventListener("pointermove", CanvinPM);
    NewCanv.addEventListener("pointerup", CanvinPU);
}

function disableSelect(){
    // 선택/삭제모드 비활성화
    for (sel of document.querySelectorAll("div.select")){
        sel.classList.remove("select");
    }
    for (del of document.querySelectorAll("div#deleteBox")){
        del.remove();
    }
}

function InTextPD(e){
    if (DeleteEditing() == 1){return;}
    chkMove = [e.clientX, e.clientY, 0, 0];
    SelcLine = e.currentTarget;
 
    editor.addEventListener("pointermove", InEditorPMCancel); // 커서 움직이는것 감지시 편집모드 취소
    SelcLine.addEventListener("pointerup", InTextPU);
}

function InTextPU(e){
    // 수정모드 진입
    nowEditing = e.currentTarget;
    document.body.classList.add("block")
    nowEditing.classList.add("editing");

    editBox = editMode.cloneNode(true);
    nowEditing.appendChild(editBox); // div#Text에 추가
    editModeSet(editBox);
    
    editor.removeEventListener("pointermove", InEditorPMCancel);
    SelcLine.removeEventListener("pointerup", InTextPU);
    SelcLine.removeEventListener("pointerdown", InTextPD);
}

function InSelPD(e){
    // 삭제 부분 시작
    if (editSelStart == null){
        editSelStart = e.currentTarget.id.replace(/[^0-9]/g,"");
        e.currentTarget.classList.add("select")
    }
    else if (editSelEnd == undefined){
        editSelEnd = e.currentTarget.id.replace(/[^0-9]/g,"");
        
        // 삭제 메뉴 생성
        disableSelect();
        deleteMenu = document.createElement("div");
        deleteMenu.id = "deleteBox";
        deleteMenu.start = editSelStart; deleteMenu.end = editSelEnd;
        deleteMenu.innerText = 'X';
        e.currentTarget.parentNode.append(deleteMenu);
        firstChar = document.querySelector("div#SelectArea > div.SelectChar#e" + ((Number(editSelStart) <= Number(editSelEnd)) ? editSelStart : editSelEnd ))
        lastChar = document.querySelector("div#SelectArea > div.SelectChar#e" + ((Number(editSelStart) <= Number(editSelEnd)) ? editSelEnd : editSelStart ))
        dleft = firstChar.offsetLeft + "px";
        dwidth = String(Number(lastChar.offsetLeft + lastChar.offsetWidth) - parseFloat(dleft)) + "px";
        deleteMenu.style.cssText = "left: " + dleft + "; width: " + dwidth + ";";
    }
    else{
        editSelStart = null; editSelEnd = undefined;
        disableSelect();
    }
}

function InInsPD(e){
    // 추가 부분 시작
    insChar = e.currentTarget;
    insChar.classList.add("insert");
    appendSet(insChar);
    
    // 선택 부분 비활성화
    editSelStart = null; editSelEnd = undefined;
    disableSelect();
    for (sel of document.querySelectorAll("div.SelectChar")){
        sel.removeEventListener("pointerdown", InSelPD);
    }
}

function InAppendPD(e){
    // Append 영역 캔버스 생성
    canvAppendArea = e.currentTarget;
    canvAppendArea.classList.add("appending");
    appendSet(canvAppendArea);
    for (oneAppend of canvAppendArea.parentNode.children){
        oneAppend.removeEventListener("pointerdown", InAppendPD);
    }
}

// 캔버스 드로우 관련
function CanvinPD(e){
    //if (e.pointerType == "pen"){
        activeDraw = 1;
        if (firstPoint[0] != undefined){return;}
         firstPoint = [e.offsetX, e.offsetY];
    //}
}

function CanvinPM(e){
    if (/*e.pointerType == "pen" &&*/ activeDraw == 1 /*&& e.pressure != 0*/){
        pp = setCanvasDR([e.offsetX,e.offsetY], (pp != [undefined, undefined]) ? pp : [e.offsetX, e.offsetY]);
    }
}

function CanvinPU(e){
    //if (e.pointerType == "pen"){
        activeDraw = 0;
        //clearTimeout(setTime);
        //setTime = setTimeout(prcLine, 1000, canvasN.parentNode.id == "LText" ? false : true, [firstPoint[0], firstPoint[1], e.offsetX]);
        pp = [undefined, undefined];
    //}
}

function setCanvasWH(canv){
    canv.width = canv.offsetWidth;
    canv.height = canv.offsetHeight;
}

function setCanvasDR([nxx, nyy], [pxx, pyy]){
    if (!activeDraw){return;}
    ctx.strokeStyle = "rgba(0,0,0,0)";
    ctx.moveTo(nxx, nyy);
    ctx.lineWidth = 2; ctx.lineCap = "round"; ctx.strokeStyle = "#000";
    ctx.beginPath();
    ctx.moveTo(nxx, nyy);
    ctx.lineTo(pxx, pyy);
    ctx.stroke();
    return [nxx, nyy];
}

function InEditorPMCancel(e){
    // 롱프레스가 아닌 스크롤인 경우 무시 (이벤트 삭제)

    // 다만 약간의 오차의 경우 무시
    if (Math.sqrt(Math.abs(e.clientX-chkMove[0]) + Math.abs(e.clientY-chkMove[1])) <= 2 ){return;}

    editor.removeEventListener("pointermove", InEditorPMCancel);
    SelcLine.removeEventListener("pointerup", InTextPU);
}

function setEditor(){
    let LineNum = 1;
    for (let TextOne of Lines){
        setLine(TextOne, LineNum);
        LineNum += 1;
    }
}

function setLine(text, num){
    Line = OneLine.cloneNode(true);
    Line.id += num;
    Line.children[0].children[1].innerText = num; // Line Number
    Line.children[1].children[0].innerText = text; // Line Text

    Line.children[1].addEventListener("pointerdown", InTextPD); // Text에 이벤트 추가
    editor.appendChild(Line);
}

function TextToLines(text){
    Lines = text.split('\n');
}

document.addEventListener("DOMContentLoaded", function(){
    editor = document.getElementById("editor");
    OneLine = document.querySelector("div#d.OneLine");
    editMode = document.getElementById("editMode");
    OneLH = OneLine.offsetHeight;
    //document.addEventListener("contextmenu", () => {return false;});

    TextToLines(FileText);
    setEditor();
});

//todo html에 editMode엘리먼트 추가해서 편집모드 기능 추가.