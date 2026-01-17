import Button from '../../../components/ui/Button'
import { Link } from 'react-router-dom'

export default function QuickActionPanel() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
      <div className="space-y-3">
        <Link to="/blood-request-portal">
          <Button variant="primary" className="w-full">
            Create Blood Request
          </Button>
        </Link>
        <Link to="/donor-registration">
          <Button variant="secondary" className="w-full">
            Register as Donor
          </Button>
        </Link>
        <Link to="/live-donor-map">
          <Button variant="secondary" className="w-full">
            View Donor Map
          </Button>
        </Link>
      </div>
    </div>
  )
}
