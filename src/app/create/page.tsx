import QuizForm from "../components/QuizForm";


export default function CreatePage() {

    return (
        <div className="px-5 pb-6">
            <h1 className="text-2xl font-semibold mb-4">Create a New Quiz</h1>
            <p>Use the form below to create your quiz.</p>
            <QuizForm />
            <p className="mt-4 text-sm text-gray-500">Once created, you can add questions and options to your quiz.</p>
        </div>
    );
}