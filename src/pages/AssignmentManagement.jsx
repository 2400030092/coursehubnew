// no local state needed yet
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '../components/Card';
import { Button } from '../components/Button';
import { SEO } from '../components/SEO';

export const AssignmentManagement = () => {
  const { id } = useParams();

  return (
    <div className="p-6">
      <SEO
        title="Assignment Management"
        description="Create and manage assignments for your course"
        keywords="assignment management, course assignments, instructor"
      />
      <Card>
        <CardHeader>
          <h1 className="text-2xl font-bold text-gray-900">Assignment Management</h1>
          <p className="text-gray-600">Course ID: {id}</p>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Assignment management functionality will be implemented here.</p>
          <Button className="mt-4">Create Assignment</Button>
        </CardContent>
      </Card>
    </div>
  );
};
