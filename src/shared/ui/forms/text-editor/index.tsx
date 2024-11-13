"use client"
import { COLORS } from '@/constants';
import { Box, Text } from '@mantine/core';
import { BulletListControl, Link, OrderedListControl, RichTextEditor } from '@mantine/tiptap';
import { Color } from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import Placeholder from '@tiptap/extension-placeholder';
import SubScript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
type Props = {
    value?: string;
    label: string;
    onChange?: (s: string) => void;
}

const controlProps = {
    styles: { control: { background: "none", color: COLORS.PRIMARY_COLOR, } },
    color: 'white'
}

export const AppTextEdtior = ({ value, label, onChange }: Props) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link,
            Superscript,
            SubScript,
            Highlight,
            TextStyle,
            Color,
            Placeholder.configure({ placeholder: label }),
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
        ],
        editorProps: {
            transformPastedText(text) {
                return text.replaceAll("background", " ");
            },
            transformPastedHTML(html) {
                const res = html.replaceAll("pre", "div")?.replaceAll("code", "p");
                return res
            },
        },
        content: value,
        immediatelyRender: true,
        enableInputRules: true,
        onUpdate(props) {
            const str = props.editor.getHTML()
            if (onChange) {
                onChange(str)
            }
        },
    });

    return (
        <Box>
            <Text mb={5} c={COLORS.PRIMARY_COLOR} fz={16} fw="400">
                {label}
            </Text>
            <RichTextEditor editor={editor}>
                <RichTextEditor.Toolbar bg="none" sticky stickyOffset={60}>
                    <RichTextEditor.ControlsGroup bg="none">
                        <RichTextEditor.Bold  {...controlProps} />
                        <RichTextEditor.Italic {...controlProps} />
                        <RichTextEditor.Underline {...controlProps} />
                        <RichTextEditor.Strikethrough {...controlProps} />
                        <RichTextEditor.ClearFormatting {...controlProps} />
                        <RichTextEditor.Highlight {...controlProps} />
                        <RichTextEditor.Code {...controlProps} />
                    </RichTextEditor.ControlsGroup>
                    <RichTextEditor.ControlsGroup bg="none">
                        <RichTextEditor.H1 {...controlProps} />
                        <RichTextEditor.H2 {...controlProps} />
                        <RichTextEditor.H3 {...controlProps} />
                        <RichTextEditor.H4 {...controlProps} />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup bg="none">
                        <RichTextEditor.Blockquote {...controlProps} />
                        <RichTextEditor.Hr {...controlProps} />
                        <OrderedListControl {...controlProps} />
                        <BulletListControl {...controlProps} />
                        <RichTextEditor.Subscript {...controlProps} />
                        <RichTextEditor.Superscript {...controlProps} />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup bg="none">
                        <RichTextEditor.Link {...controlProps} />
                        <RichTextEditor.Unlink {...controlProps} />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup bg="none">
                        <RichTextEditor.AlignLeft {...controlProps} />
                        <RichTextEditor.AlignCenter {...controlProps} />
                        <RichTextEditor.AlignJustify {...controlProps} />
                        <RichTextEditor.AlignRight {...controlProps} />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup bg="none">
                        <RichTextEditor.Undo {...controlProps} />
                        <RichTextEditor.Redo {...controlProps} />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ColorPicker
                        {...controlProps}
                        colors={[
                            '#25262b',
                            '#868e96',
                            '#fa5252',
                            '#e64980',
                            '#be4bdb',
                            '#7950f2',
                            '#4c6ef5',
                            '#228be6',
                            '#15aabf',
                            '#12b886',
                            '#40c057',
                            '#82c91e',
                            '#fab005',
                            '#fd7e14',
                        ]}
                    />
                </RichTextEditor.Toolbar>
                <RichTextEditor.Content />
            </RichTextEditor>
        </Box>
    )
}
