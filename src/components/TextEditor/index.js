import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./styles.css";

const TextEditor = ({ name, editorContent, handleChangeEditor }) => {
	console.log({ name, editorContent, handleChangeEditor });

	// const TextEditor = () => {
	// console.log({ name, editorContent, handleChangeEditor });
	// let editorState = EditorState.createEmpty();

	// let editorStateOld = EditorState.createWithContent(
	// 	ContentState.createFromBlockArray(
	// 		convertFromHTML(props.postList[0].description)
	// 	)
	// );

	// const [editorContent, setEditorContent] = useState(editorState);

	const onEditorStateChange = (editorState) => {
		handleChangeEditor(name, editorState);
	};

	return (
		<div className="editor_container">
			<Editor
				editorState={editorContent}
				onEditorStateChange={onEditorStateChange}
			/>

			{/* <div
				dangerouslySetInnerHTML={{
					__html: draftToHtml(convertToRaw(editorContent.getCurrentContent())),
				}}
			></div> */}
		</div>
	);
};

export default TextEditor;
