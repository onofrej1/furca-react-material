import React from 'react';
import PropTypes from 'prop-types';

export default class CKEditor extends React.Component {

	constructor( props ) {
		super( props );

		this.editorInstance = null;
	}

	// This component should never be updated by React itself.
	shouldComponentUpdate() {
		return false;
	}

	// Update editor data if data property is changed.
	componentWillReceiveProps( newProps ) {
		if ( this.editorInstance && newProps.data ) {
			this.editorInstance.setData( newProps.data );
		}
	}

	// Initialize editor when component is mounted.
	componentDidMount() {
		this._initializeEditor();
	}

	// Destroy editor before unmouting component.
	componentWillUnmount() {
		this._destroyEditor();
	}

	// Render <div> element which will be replaced by CKEditor.
	render() {
	  return <div ref={ ref => ( this.domContainer = ref ) }></div>;
    /*return <textarea ref={ ref => ( this.domContainer = ref )} name={this.props.name}
    label={this.props.label}></textarea>*/
	}

	_initializeEditor() {
		this.props.editor
			.create( this.domContainer, this.props.config )
			.then( editor => {
				this.editorInstance = editor;

				// TODO: Pass data via constructor.
				this.editorInstance.setData( this.props.data );

				// TODO: Add example using it.
				if ( this.props.onInit ) {
					this.props.onInit( editor );
				}

				//this.bindChangeEvent(editor, editor.model.document);

				if ( this.props.onChange ) {
					const document = this.editorInstance.model.document;
					document.on( 'change', () => {
            console.log(document.differ.getChanges());
						if ( document.differ.getChanges().length > 0 ) {
            console.log('changexx');

							this.props.onChange( 'content', editor.getData() );
						}
					} );
				}
			} )
			.catch( error => {
				console.error( error );
			} );
	}

	_destroyEditor() {
		if ( this.editorInstance ) {
			this.editorInstance.destroy();
		}
	}
}

// Properties definition.
CKEditor.propTypes = {
	editor: PropTypes.func.isRequired,
	data: PropTypes.string,
	config: PropTypes.object,
	onChange: PropTypes.func,
	onInit: PropTypes.func
};

// Default values for non-required properties.
CKEditor.defaultProps = {
	data: '',
	config: {}
};
