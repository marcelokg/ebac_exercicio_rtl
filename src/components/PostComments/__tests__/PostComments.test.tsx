import { fireEvent, render, screen } from '@testing-library/react';
import Post from '../../Post/index';
import PostComment from '../index';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

describe('Teste para o componente PostComment', () => {
    it('Deve renderizar o componente corretamente', () => {
        render(<PostComment/>);
        expect(screen.getByText('Comentar')).toBeInTheDocument();
    });

    it('Deve inserir corretamente 2 comentários', async () => {
        render(<PostComment/>)
        const commentUlElement = screen.getByTestId('comment-ul')
        const textareaElement = screen.getByTestId('comment-textarea') as HTMLTextAreaElement
        const commentButtonElement = screen.getByTestId('comment-button')

        await act(async () => {
            await userEvent.type(textareaElement, 'Primeiro comentário')
            fireEvent.click(commentButtonElement)
        })

        await act(async () => {
            await userEvent.type(textareaElement, 'Segundo comentário')
            fireEvent.click(commentButtonElement)
        })

        const commentItems = commentUlElement.querySelectorAll('li')
        expect(commentItems).toHaveLength(2)
        expect(commentItems[0]).toHaveTextContent('Primeiro comentário')
        expect(commentItems[1]).toHaveTextContent('Segundo comentário')

        expect(textareaElement.value).toBe('')
    })
})